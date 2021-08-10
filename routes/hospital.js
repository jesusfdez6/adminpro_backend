const {Router} = require('express');
const {check} = require('express-validator');
const { getHospital, postHospital, putHospital, deleteHospital } = require('../controller/hospital');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-token');

const router = Router();


router.get('/',validarJWT,getHospital);

router.post('/',[
validarJWT,
check('nombre','El nombre del hospital es necesario').not().isEmpty(),
validarCampos
]
,postHospital);

router.put('/:id',putHospital);

router.delete('/:id',deleteHospital);


module.exports = router;