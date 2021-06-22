const {Router} = require('express');
const { check } = require('express-validator');
const { actualizarImagen, mostrarDasboard } = require('../controller/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router= Router();


router.get('/', mostrarDasboard);
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de tipo mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','areas','docentes','historias'])),
    validarCampos
], actualizarImagen);


module.exports = router;