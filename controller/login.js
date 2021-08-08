const {response,request} = require("express");
const Usuario = require('../models/usuario');
const bcript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const login = async(req=request,res=response)=>{

    const {email,password} = req.body;
    try {
      
        const UsuarioDB = await Usuario.findOne({email});

        if(!UsuarioDB){

            return res.status(400).json({
                ok:false,
                msg:"Credenciales incorrectas(falla correo)"
            });

        }

        const validarPassword = bcript.compareSync(password,UsuarioDB.password);
        
        if(!validarPassword){

            return res.status(400).json({
                ok:false,
                msg:"Credenciales incorrectas(falla password)"
            });
        }

        //JWT
        const token = await generarJWT(UsuarioDB.id);

        res.status(200).json({
            ok:true,
            token
        });


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
            
        });
    }
}

module.exports = {
  login
}