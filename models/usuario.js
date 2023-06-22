const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
	},
	correo: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true,
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: true,
		default: 'USER_ROLE',
		emun: ['ADMIN_ROLE', 'USER_ROLE', 'DUEÑO_ROLE'],
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject();
	//* cambiar _id por uid
	usuario.uid = _id;
	return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
