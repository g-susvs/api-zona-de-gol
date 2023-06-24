const Reserva = require('../models/reserva');
const Cancha = require('../models/cancha');

const getReservaPorId = async (req, res) => {
	const { id: idReserva } = req.params;
	const { id: idUsuario } = req.usuario;

	try {
		const reserva = await Reserva.findById(idReserva)
			.populate('cancha_id')
			.populate('usuario_id', ['id_usuario']);
		if (!reserva) {
			return res.status(404).json({
				msg: 'Not found',
			});
		}
		if (reserva.usuario_id.id !== idUsuario) {
			return res.status(403).json({
				msg: 'No autorizado',
			});
		}
		return res.status(200).json({
			msg: 'Reserva por id',
			reserva,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error,
		});
	}
};

const crearReserva = async (req, res) => {
	const body = req.body;

	const { cancha_id } = req.body;

	const cancha = await Cancha.findById(cancha_id);
	if (!cancha) {
		return res.status(404).json({
			msg: 'La cancha no existe',
		});
	}
	const reserva = new Reserva(body);
	reserva.usuario_id = req.usuario.id;
	try {
		const { fecha, exp } = convertDateMilisecToString(
			reserva.fechaMilsec,
			reserva.duracion
		);
		reserva.fecha = fecha;
		reserva.exp = exp;
		await reserva.save();

		return res.status(201).json({
			msg: 'Crear reserva',
			reserva,
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
};

function convertDateMilisecToString(fechaMilsec, duracion) {
	const fecha = new Date(fechaMilsec);
	const dia = fecha.toLocaleDateString();
	const hora = hourOrMinutesToString(fecha.getHours());
	const min = hourOrMinutesToString(fecha.getMinutes());

	const expMilsec = 1000 * 1 * 60 * duracion + fecha.getTime();
	const exp = new Date(expMilsec);
	const expHora = hourOrMinutesToString(exp.getHours());
	const expMin = hourOrMinutesToString(exp.getMinutes());
	return {
		fecha: `${dia} ${hora}:${min}`,
		exp: `${exp.toLocaleDateString()} ${expHora}:${expMin}`,
	};
}

function hourOrMinutesToString(num = 0) {
	const numString = num.toString();
	return numString.length === 1 ? '0' + numString : numString;
}
module.exports = {
	getReservaPorId,
	crearReserva,
};
