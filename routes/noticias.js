const { Router } = require("express");
const { check } = require("express-validator");
const { noticiasGet, noticiasPost, noticiaGet, noticiasDelete, noticiasPut } = require("../controller/noticias");
const { esTituloNoticiaValido, esIDValido, esIdNoticiaValido } = require("../helpers/db-validators");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const {validarCampos} = require('../middlewares/validar-campos');



const router = Router();

router.get('/', noticiasGet);
router.get('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(esIdNoticiaValido),
    validarCampos
], noticiaGet);
router.post('/',[
    check('descripcion', 'El titulo es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('titulo').custom(esTituloNoticiaValido),
    validarCampos
], noticiasPost);
router.put('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(esIdNoticiaValido),
    validarCampos
], noticiasPut)
router.delete('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(esIdNoticiaValido),
    validarCampos
], noticiasDelete)

module.exports = router;