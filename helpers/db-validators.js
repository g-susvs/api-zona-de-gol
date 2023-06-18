const Cancha = require('../models/cancha')

const existeCanchaPorId = async (id)=>{
    const existeCancha = await Cancha.findById(id);
    if (!existeCancha) {
        throw new Error(`El id no existe ${id}`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = [])=>{

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}

module.exports = {
    existeCanchaPorId,
    coleccionesPermitidas
}