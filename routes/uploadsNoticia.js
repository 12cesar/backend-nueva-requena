const {Router} = require('express');
const { check } = require('express-validator');
const { actualizarImagenNoticias } = require('../controller/uploadsNoticias');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router= Router();


router.put('/:id', [
    check('id', 'El id debe ser de tipo mongo').isMongoId(),
    validarCampos
], actualizarImagenNoticias);


module.exports = router;