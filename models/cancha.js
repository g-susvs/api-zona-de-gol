const { Schema, model } = require('mongoose');

const CanchaSchema = new Schema({
	limite_reservacion: {
		type: Array,
	},
	nombre_local: {
		type: String,
		required: [true, 'El nombre de el local es obligatiorio'],
	},
	superficie: {
		type: String,
		required: [true, 'La superficie es obligatoria'],
	},
	descripcion: {
		type: String,
	},
	// [ {"duracion":90,"precio":50}]
	precios: {
		type: Array,
	},
	distrito: {
		type: String,
	},
	direccion: {
		type: String,
	},
	imagen: {
		type: String,
		default: '',
	},
	calificacion: {
		type: Number,
		min: 0,
		max: 5,
	},
});

CanchaSchema.methods.toJSON = function () {
	const { __v, estado, ...data } = this.toObject();

	return data;
};

module.exports = model('Cancha', CanchaSchema);
