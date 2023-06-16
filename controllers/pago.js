const Pago = require("../models/pago");

const verPago = async (req, res) => {
  const { id } = req.params;
  try {
    const pago = await Pago.findById(id).populate("reserva_id", [
      "ubicacion",
      "fecha",
      "exp",
      "duracion",
      "estado_de_reserva",
    ]);
    if (!pago) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    return res.status(200).json({
      msg: "Pago realizado",
      pago,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

const generarPago = async (req, res) => {
  const body = req.body;

  try {
    const pago = new Pago(body);

    await pago.save();

    return res.status(201).json({
      msg: "Pago ok",
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
