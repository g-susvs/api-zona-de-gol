const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { googleSingIn } = require('../controllers/usuario');

const router = Router();


router.post('/google', [
    check('id_token', 'id token  es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

module.exports = router;
// 