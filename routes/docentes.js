const {Router} = require('express');
const { check } = require('express-validator');
const { docentesGet, docentesPost, docenteGet, docentesPut, docentesDelete } = require('../controller/docentes');
const { esNombreDocenteValido, esIdCategoriaValida, esIdAreaValido, esIdDocenteValido } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

router.get('/', docentesGet);
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(esIdDocenteValido),
    validarCampos
], docenteGet);
router.post('/', [
    check('nombre', 'El nombre del docente es obligatorio').not().isEmpty().custom(esNombreDocenteValido),
    check('categoria').custom(esIdCategoriaValida),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('area').custom(esIdAreaValido),
    check('area','No es un id de Mongo').isMongoId(),
    validarCampos
], docentesPost);
router.put('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(esIdDocenteValido),
    validarCampos
], docentesPut);
router.delete('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(esIdDocenteValido),
    validarCampos
], docentesDelete);
module.exports = router