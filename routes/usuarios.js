const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuarioGet } = require('../controller/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');
const {esUsuarioValido, esNombreValido, esIDValido} = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const Area = require('../models/area');
const router= Router();

router.get('/', usuariosGet);
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIDValido),
    validarCampos
], usuarioGet);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty().custom(esNombreValido),
    check('usuario','El usuario es obligatorio').not().isEmpty().custom(esUsuarioValido),
    check('password','El password es obligatorio y debe ser mas de 6 caracteres').isLength({min:6}),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIDValido),
    validarCampos
],usuariosPut);
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIDValido),
    validarCampos
], usuariosDelete);

module.exports = router;