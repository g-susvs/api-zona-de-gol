const { request, response } = require('express');
const Pago = require('../models/pago');

const verPago = async (req, res = response) => {
	const { id } = req.params;
	try {
		const pago = await Pago.findById(id)
			.populate('usuario_id', ['nombre', 'correo'])
			.populate('reserva_id', [
				'nombre_local',
				'fecha',
				'exp',
				'duracion',
				'estado_de_reserva',
			]);
		if (!pago) {
			return res.status(404).json({
				msg: 'Not found',
			});
		}
		// return res.status(200).json({
		//   msg: "Pago realizado",
		//   pago,
		// });

		// Vista con handlebars
		// TODO mandar los datos de la cancha
		return res.render('pago', {
			titulo: `Pago - ${pago.usuario_id.nombre}`,
			usuario: pago.usuario_id.nombre,
			correo: pago.usuario_id.correo,
			duracion: pago.reserva_id.duracion,
			fecha: pago.reserva_id.fecha,
			exp: pago.reserva_id.exp,
			monto:
				pago.monto.toString().length === 2 ? pago.monto + '.00' : pago.monto,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

const generarPago = async (req = request, res) => {
	const body = req.body;

	// TODO: se obtiene del JWT
	const { id } = req.headers;

	try {
		const pago = new Pago(body);
		pago.usuario_id = id;
		await pago.save();

		return res.status(201).json({
			msg: 'Pago ok',
			pago,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

module.exports = {
	generarPago,
	verPago,
};
