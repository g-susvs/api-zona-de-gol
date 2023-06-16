const { Schema, model } = require("mongoose");

const PagoSchema = new Schema({
  usuario_id: {
    // type: Schema.Types.ObjectId
    type: String,
    required: true,
  },
  reserva_id: {
    type: Schema.Types.ObjectId,
    ref: "Reserva",
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
});
PagoSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject(); //quitar __v del paginado | data muestra

  return data;
};

module.exports = model("Pago", PagoSchema);
