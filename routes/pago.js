const { Router } = require('express');
const { generarPago, verPago } = require('../controllers/pago');
const { body, validationResult, param, header } = require('express-validator');

const router = Router();

router.get(
	'/:id',
	[param('id', 'El id no es valido').isMongoId(), validarCampos],
	verPago
);

router.post(
	'/',
	[
		// TODO validar jwt - para identificar al usuario
		// De momento por el header por que no esta el servicio de usuario
		header('id', 'El id no es valido').isMongoId(),
		body('reserva_id', 'El id no es valido').isMongoId(),
		body('monto', 'El monto es requerido').isNumeric(),
		validarCampos,
	],
	generarPago
);

function validarCampos(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}
module.exports = router;
