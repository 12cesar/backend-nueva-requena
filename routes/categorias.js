const {Router} = require('express');
const { check } = require('express-validator');
const {categoriaPost, categoriasPut, categoriasDelete, categoriasGet, categoriaGet } = require('../controller/categorias');
const { esCategoriaValida, esIdCategoriaValida } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

router.get('/', categoriasGet);
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdCategoriaValida),
    validarCampos
], categoriaGet)
router.post('/', [
    check('nombre', 'La categoria es obligatoria').not().isEmpty().custom(esCategoriaValida),
    validarCampos
], categoriaPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdCategoriaValida),
    validarCampos
], categoriasPut)
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdCategoriaValida),
    validarCampos
],categoriasDelete)

module.exports = router