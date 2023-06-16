const { Router } = require("express");
const { generarPago, verPago } = require("../controllers/pago");
const { body, validationResult, param } = require("express-validator");

const router = Router();

router.get(
  "/:id",
  [param("id", "El id no es valido").isMongoId(), validarCampos],
  verPago
);

router.post(
  "/",
  [
    // validar jwt - para identificar al usuario
    // De momento por el body por que no esta el servicio de usuario
    // body("usuario_id", "El id no es valido").isMongoId(),
    body("usuario_id", "El id no es valido").notEmpty(),
    body("reserva_id", "El id no es valido").isMongoId(),
    body("monto", "El monto es requerido").isNumeric(),
    validarCampos,
  ],
  generarPago
);

function validarCampos(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
module.exports = router;
