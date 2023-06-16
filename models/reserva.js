const { Schema, model } = require("mongoose");

const ReservaSchema = new Schema({
  usuario_id: {
    // type: Schema.Types.ObjectId,
    // ref: "Usuario",
    type: String,
    require: true,
  },
  cancha_id: {
    // type: Schema.Types.ObjectId,
    // ref: "Cancha",
    type: String,
    require: true,
  },
  fechaMilsec: {
    type: Number,
    require: true,
  },
  fecha: {
    type: String,
  },
  duracion: {
    type: Number, // 60 - 90 -120
    require: true,
  },
  exp: {
    type: String,
  },
  ubicacion: {
    type: String,
    require: true,
  },
  estado_de_reserva: {
    type: String, // pendiente - confirmado - cancelado
    require: true,
  },
});

ReservaSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject(); //quitar __v del paginado | data muestra

  return data;
};

module.exports = model("Reserva", ReservaSchema);
