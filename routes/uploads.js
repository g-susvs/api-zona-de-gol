const {Router} = require('express');//desestructurar una funcion de express -router
const {check} = require('express-validator');
const {coleccionesPermitidas} = require('../helpers/db-validators')
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');

const router = Router();

router.post('/', validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['cancha'])),
],
actualizarImagenCloudinary);

router.get('/:coleccion/:id',
mostrarImagen)

module.exports = router;


function validarArchivoSubir (req,res=response,next){

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg:'No hay archivos que subir -validarArchivoSubir'
        });
    }

    next();

}

function validarCampos(req, res, next){

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}