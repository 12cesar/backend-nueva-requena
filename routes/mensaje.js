const {Router} = require('express');
const { check } = require('express-validator');
const { mensajePost, mensajeGet, mensajeDelete } = require('../controller/mensaje');
const { esIdMensajeValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router = Router();

router.get('/', mensajeGet)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    validarCampos
], mensajePost);
router.delete('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(esIdMensajeValido),
    validarCampos
], mensajeDelete)




module.exports = router;