const { Schema, model } = require('mongoose');

const ReservaSchema = new Schema({
	usuario_id: {
		// type: Schema.Types.ObjectId,
		// ref: "Usuario",
		type: String,
		required: true,
	},
	cancha_id: {
		// type: Schema.Types.ObjectId,
		// ref: "Cancha",
		type: String,
		required: true,
	},
	fechaMilsec: {
		type: Number,
		required: true,
	},
	fecha: {
		type: String,
	},
	duracion: {
		type: Number, // 60 - 90 -120
		required: true,
	},
	exp: {
		type: String,
	},
	ubicacion: {
		type: String,
		required: true,
	},
	estado_de_reserva: {
		type: String, // pendiente - confirmado - cancelado
		required: true,
	},
});

ReservaSchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject(); // quitar __v del paginado | data muestra

	return data;
};

module.exports = model('Reserva', ReservaSchema);
