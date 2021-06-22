const {Router} = require('express');
const { check } = require('express-validator');
const { historiaGet, historiaPost, historiaPut } = require('../controller/historias');
const { esIdHistorioValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');


const router = Router();

router.get('/',historiaGet)
router.post('/',[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    validarCampos
],historiaPost)
router.put('/:id',[
    check('id', 'El id no es de tipo mongo').isMongoId(),
    check('id').custom(esIdHistorioValido),
    validarCampos
],historiaPut)




module.exports = router;
