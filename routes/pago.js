const { Router } = require('express');
const { generarPago, verPago } = require('../controllers/pago');
const { body, param } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get(
	'/:id',
	[param('id', 'El id no es valido').isMongoId(), validarCampos],
	verPago
);

router.post(
	'/',
	[
		validarJWT,
		body('reserva_id', 'El id no es valido').isMongoId(),
		body('monto', 'El monto es requerido').isNumeric(),
		validarCampos,
	],
	generarPago
);
module.exports = router;
