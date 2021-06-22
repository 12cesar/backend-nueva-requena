const {Router, request} = require('express');
const { check } = require('express-validator');

const { areasPost, areasGet, areaGet, areasPut, areasDelete } = require('../controller/areas');
const { esAreaValido, esIdAreaValido } = require('../helpers/db-validators');
const {validarCampos, validarArchivoSubir} = require('../middlewares');
const router = Router();
const multer = require('multer');

router.get('/', areasGet)
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdAreaValido),
    validarCampos
], areaGet);
router.post('/',[
    validarArchivoSubir,
    validarCampos
], areasPost);
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdAreaValido),
    validarCampos
],areasPut);
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esIdAreaValido),
    validarCampos
], areasDelete)
module.exports = router;