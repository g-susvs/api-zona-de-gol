const Reserva = require("../models/reserva");

const getReservaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    return res.status(200).json({
      msg: "Reserva por id",
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

  const reserva = new Reserva(body);
  try {
    const { fecha, exp } = convertDateMilisecToString(
      reserva.fechaMilsec,
      reserva.duracion
    );
    reserva.fecha = fecha;
    reserva.exp = exp;
    await reserva.save();

    return res.status(201).json({
      msg: "Crear reserva",
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
  const numString = num.toString()(numString.length === 1)
    ? "0" + numString
    : numString;
}
module.exports = {
  getReservaPorId,
  crearReserva,
};
