const { Schema, model } = require('mongoose');

const ReservaSchema = new Schema({
	usuario_id: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
	cancha_id: {
		type: Schema.Types.ObjectId,
		ref: 'Cancha',
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
