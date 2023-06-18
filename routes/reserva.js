const { Router } = require('express');
const { getReservaPorId, crearReserva } = require('../controllers/reserva');
const { param, body, validationResult } = require('express-validator');

const router = Router();

router.get(
	'/:id',
	[
		// validar JWT - que no cualquier persona pueda ver las reservas
		param('id', 'El id no es valido').isMongoId(),
		validarCampos,
	],
	getReservaPorId
);

router.post(
	'/',
	[
		// validar jwt - para obtener el id del usuario y authorizarlo para que realize su reserva
		// De momento por el body por que no esta el servicio de usuario
		// body("usuario_id", "El id no es valido").isMongoId(),
		// body("cancha_id", "El id no es valido").isMongoId(),
		body('usuario_id', 'El id no es valido').notEmpty(),
		body('cancha_id', 'El id no es valido').notEmpty(),
		body('fechaMilsec', 'La fecha es requerida').isNumeric(),
		body('duracion', 'La fecha es requerida').isNumeric(),
		body('ubicacion', 'La ubicacion es requerida').notEmpty(),
		body('estado_de_reserva', 'Requerido').notEmpty(),
		validarCampos,
	],
	crearReserva
);

function validarCampos(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}
module.exports = router;
