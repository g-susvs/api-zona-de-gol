const { Router } = require('express');
const { getReservaPorId, crearReserva } = require('../controllers/reserva');
const { param, body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get(
	'/:id',
	[validarJWT, param('id', 'El id no es valido').isMongoId(), validarCampos],
	getReservaPorId
);

router.post(
	'/',
	[
		validarJWT,
		// TODO - body("cancha_id", "El id no es valido").isMongoId(),
		body('cancha_id', 'El id no es valido').notEmpty(),
		body('fechaMilsec', 'La fecha es requerida').isNumeric(),
		body('duracion', 'La fecha es requerida').isNumeric(),
		body('ubicacion', 'La ubicacion es requerida').notEmpty(),
		body('estado_de_reserva', 'Requerido').notEmpty(),
		validarCampos,
	],
	crearReserva
);

module.exports = router;
