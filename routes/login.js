const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/login');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-token');

const router = Router();

router.post('/',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);


module.exports = router;