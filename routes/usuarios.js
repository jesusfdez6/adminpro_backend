const {Router} = require('express');
const {getUsuarios,postUsuarios,updateUsuarios,deleteUsuarios} = require('../controller/usuarios')
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-token');


const router = Router();

router.get('/',validarJWT
,getUsuarios);

router.post('/',[
check("nombre","El nombre es obligatorio").not().isEmpty(),
check("password","La contraseña es obligatorio").not().isEmpty(),
check("email", "El correo es obligatorio").isEmail(),
validarCampos
],postUsuarios);

router.put('/:id',[
validarJWT,    
check("nombre","El nombre es obligatorio").not().isEmpty(),
check("email", "El correo es obligatorio").isEmail(),
check("role", "El role es obligatorio").not(),
validarCampos,

],
updateUsuarios);

router.delete('/:id',validarJWT,
    deleteUsuarios);
    



module.exports = router;