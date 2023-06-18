const { Router } = require("express");
const {check} = require('express-validator');
const {validationResult} = require('express-validator');

const{ CanchasGet,CanchasPost,Canchasput,CanchasDelete,ObtenerCancha}= require('../controllers/cancha');
const { existeCanchaPorId } = require("../helpers/db-validators");

const router = Router();

router.get('/', CanchasGet);

router.get('/:id',
    // [
    // check('id','No es un id de Mongo valido').isMongoId,
    // validarCampos],
ObtenerCancha);

router.post('/',
    // [
    // validarJWT,
    // check('nombre_local','El nombre es obligatorio').not().isEmpty,
    // validarCampos,
    // check('id').custom(existeCanchaPorId)] ,
    CanchasPost);

router.put('/:id', 
    // [
    // //validarJWT
    // check('nombre_local','El nombre es obligatorio').not().isEmpty,
    // check('id').custom(existeCanchaPorId),
    // validarCampos],
    Canchasput)

router.delete('/:id', CanchasDelete)

function validarCampos(req, res, next){

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}

module.exports = router;
