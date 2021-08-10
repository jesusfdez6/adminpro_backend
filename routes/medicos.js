const {Router} = require('express');
const {check} = require('express-validator');
const { getMedicos, postMedicos, PutMedicos, deleteMedicos } = require('../controller/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-token');

const router = Router();


router.get('/',validarJWT,getMedicos);

router.post('/',[
validarJWT,
check("nombre","El nombre del medico es obligatorio").not().isEmpty(),
check("hospital","El hospital es obligatorio").isMongoId(),
validarCampos
],
postMedicos);

router.put('/:id',PutMedicos);

router.delete('/:id',deleteMedicos);


module.exports = router;