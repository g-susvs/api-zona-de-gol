const {response} = require('express');
const { Cancha } = require('../models');
const {ObjectId}=require('mongoose').Types;

const coleccionesPermitidas = [
    'canchas'
]

// por ID
const buscarCanchas = async(termino='', res=response, precio = 0, duracion = 0)=>{

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const cancha = await Cancha.findById(termino);
        res.json({results : (cancha) ? [cancha] : []})
    }

    const regex = new RegExp(termino, 'i');
    
    const query = {};

  if (precio > 0 || duracion > 0) {
    // Si se proporciona un precio o duración, agrega la condición correspondiente al objeto de consulta
    query.precios = {
      $elemMatch: {
        precio: { $eq: precio },
        duracion: { $eq: duracion }
      }
    };
  }

  // Agrega las condiciones de búsqueda adicionales
  query.$or = [
    { distrito: regex },
    { superficie: regex },
    { direccion: regex }
  ];

  const canchas = await Cancha.find(query);

    // argumentos
    // const canchas = await Cancha.find({
    //     $or:[{distrito : regex},{superficie:regex},{direccion : regex},{'precios.precio': precio},{'precios.duracion': duracion}]
    // });

    res.json({
        results : canchas
    })
}

const buscar =( req, res = response)=>{

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    
    switch (coleccion) {
        case 'canchas':
                buscarCanchas(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg:'se le olvido hacer esta busqueda'
            })
    }
} 

module.exports ={
    buscar
};