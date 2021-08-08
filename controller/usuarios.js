const {response,request} = require("express");
const Usuario = require('../models/usuario');
const bcript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");



const getUsuarios = async(req,res)=>{

    const usuarios =await Usuario.find({}, "nombre email, role, google");
    
    
    res.json({
        ok:true,
        usuarios
    });
}
const postUsuarios = async (req ,res = response)=>{

    const {email,password} = req.body;

   

    try{
        const existeEmail = await Usuario.findOne({email});
        
        if(existeEmail){

           return res.status(400).json({
                ok:false,
                msg:"El correo ya está registrado"
            });

        }



        const usuario = new Usuario(req.body);
        
        //encriptar password
        const salt  = bcript.genSaltSync();

        usuario.password = bcript.hashSync(password,salt)

        await usuario.save();

        const token = await generarJWT(usuario.id);

       
        res.json({
            ok:true,
            token
        });

    }catch (error){
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        });

    }


}
const updateUsuarios = async(req=request,res)=>{

    const uid = req.params.id;
    

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(400).json({
                 ok:false,
                 msg:"El usuario no existe en la base de datos"
             });
         }

         const {password,google,email,...campos} = req.body;

         if(usuarioDB.email !== email){
         
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){

                return res.status(400).json({
                    ok:false,
                    msg:"Ya existe el usuario con ese email"
                });
            }
         }
         campos.email = email;

         //Actualizar
         
         const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
         
         res.status(200).json({
            ok:true,
            msg:usuarioActualizado
        });


        
    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        });

    }
}

const deleteUsuarios = async(req,res)=>{

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(400).json({
                 ok:false,
                 msg:"El usuario no existe en la base de datos"
             });
         }

         await Usuario.findByIdAndDelete(uid);

         return res.status(200).json({
            ok:true,
            msg:"Usuario eliminado"
        });
    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        });
    }
    
   
}

module.exports = {
    getUsuarios,
    postUsuarios,
    updateUsuarios,
    deleteUsuarios
}