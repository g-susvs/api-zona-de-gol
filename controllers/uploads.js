const { response } = require('express');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { subirArchivo } = require('../helpers/subir-archivo');
const { Cancha } = require('../models/cancha');
const path = require('path');

const cargarArchivo = async (req, res = response) => {
	try {
		const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

		res.json({ path: pathCompleto });
	} catch (msg) {
		res.status(400).json({ msg });
	}
};

const actualizarImagen = async (req, res = response) => {
	const { id, coleccion } = req.params;

	let modelo;

	switch (coleccion) {
		case 'cancha':
			modelo = await Cancha.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe una Cancha con el id ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({
				msg: 'se me olvido validar esto',
			});
	}

	if (modelo.imagen) {
		const pathImagen = path.join(
			__dirname,
			'../uploads',
			coleccion,
			modelo.imagen
		);
		if (fs.existsSync(pathImagen)) {
			fs.unlinkSync(pathImagen);
		}
	}

	const pathCompleto = await subirArchivo(req.files, undefined, coleccion);
	modelo.imagen = pathCompleto;

	await modelo.save();

	res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
	const { id, coleccion } = req.params;

	let modelo;
	switch (coleccion) {
		case 'canchas':
			modelo = await Cancha.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe una Cancha con el id ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({
				msg: 'se me olvido validar esto',
			});
	}

	if (modelo.imagen) {
		const pathImagen = path.join(
			__dirname,
			'../uploads',
			coleccion,
			modelo.imagen
		);
		if (fs.existsSync(pathImagen)) {
			return res.sendFile(pathImagen);
		}
	}

	const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
	res.sendFile(pathImagen);
};

const actualizarImagenCloudinary = async (req, res = response) => {
	const { id, coleccion } = req.params;

	let modelo;

	switch (coleccion) {
		case 'cancha':
			modelo = await Cancha.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe una Cancha con el id ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({
				msg: 'se me olvido validar esto',
			});
	}

	if (modelo.imagen) {
		const nombreArr = modelo.imagen.split('/');
		const nombre = nombreArr[nombreArr.length - 1];
		const public_id = nombre.split('/').pop().split('.').shift();
		cloudinary.uploader.destroy(public_id);
	}

	const { tempFilePath } = req.files.archivo;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
	modelo.imagen = secure_url;

	await modelo.save();

	res.json(modelo);
};

module.exports = {
	cargarArchivo,
	actualizarImagen,
	mostrarImagen,
	actualizarImagenCloudinary,
};
