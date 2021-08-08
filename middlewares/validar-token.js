
const {response, request} = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req=request,res=response,next) =>{

    const token = req.header('token');

    if(!token){

        return res.status(400).json({
            ok:false,
            msg:"No hay token"
        });
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {

        return res.status(400).json({
            ok:false,
            msg:"Token incorrecto"
        });
    }
}


module.exports = validarJWT

