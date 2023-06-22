const { Router } = require('express');
const {
  CanchasGet,
  CanchasPost,
  Canchasput,
  CanchasDelete,
  ObtenerCancha,
} = require('../controllers/cancha');
const { body, param } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', CanchasGet);

router.get(
  '/:id',
  [param('id', 'No es un id de Mongo valido').isMongoId(), validarCampos],
  ObtenerCancha
);

router.post(
  '/',
  [
    body('nombre_local', 'El nombre es obligatorio').not().isEmpty(),
    body('superficie', 'La superficie es obligatoria').not().isEmpty(),
    body('distrito', 'El distrito es obligatorio').not().isEmpty(),
    body('direccion', 'La direccion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  CanchasPost
);

router.put(
  '/:id',
  [
    param('id', 'No es un id de Mongo valido').isMongoId(),
    body('nombre_local', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  Canchasput
);

router.delete(
  '/:id',
  [param('id', 'No es un id de Mongo valido').isMongoId(), validarCampos],
  CanchasDelete
);

module.exports = router;