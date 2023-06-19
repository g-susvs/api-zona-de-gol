const { response } = require('express');
const { Cancha } = require('../models');

const CanchasGet = async (req, res = response) => {
	const { limite = 5, desde = 0 } = req.query;

	const [total, canchas] = await Promise.all([
		Cancha.countDocuments(),
		Cancha.find().skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		canchas,
	});
};

const ObtenerCancha = async (req, res = response) => {
	const { id } = req.params;
	const cancha = await Cancha.findById(id);

	res.json(cancha);
};

const CanchasPost = async (req, res = response) => {
	const { calificacion, ...body } = req.body;

	if (calificacion > 5) {
		return res.status(400).json({
			error: 'El valor de campoNumber es mayor que el límite permitido.',
		});
	}

	const canchaDB = await Cancha.findOne({ nombre_local: body.nombre_local });

	if (canchaDB) {
		return res.status(400).json({
			msg: `La cancha con el nombre ${canchaDB.nombre_local}, ya existe`,
		});
	}

	const data = {
		...body,
		nombre: body.nombre_local.toUpperCase(),
	};

	const cancha = new Cancha(data);

	try {
		await cancha.save();

		res.status(201).json({ cancha });
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la cancha.' });
	}
};

const Canchasput = async (req, res = response) => {
	const { id } = req.params;

	const { ...data } = req.body;

	const cancha = await Cancha.findByIdAndUpdate(id, data, { new: true });

	res.json(cancha);
};

const CanchasDelete = async (req, res = response) => {
	const { id } = req.params;

	const canchaBorrado = await Cancha.findByIdAndDelete(id);

	res.json(canchaBorrado);
};

module.exports = {
	CanchasGet,
	CanchasPost,
	Canchasput,
	CanchasDelete,
	ObtenerCancha,
};
