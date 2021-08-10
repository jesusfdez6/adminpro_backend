const {response,request} = require("express");
const Medicos = require('../models/medicos');


const getMedicos = async(req,res)=>{

    const medicos =await Medicos.find()
    .populate("usuario","nombre img")
    .populate("hospital", "nombre");
    
    
    res.json({
        ok:true,
        medicos
    });
}
const postMedicos = async(req,res)=>{

    const uid =req.uid;
    const medicos = new Medicos({
        usuario :uid,
        ...req.body
    });
    

    try {
        
       const MedicosDB = await medicos.save();

       res.status(200).json({
           ok:true,
           medico : MedicosDB
       });


    } catch (error) {
       
       res.status(500).json({
           ok:false,
           msg:"Error inesperado"
       });
    }
 }
 const PutMedicos = async(req,res)=>{

    // const usuarios =await Usuario.find({}, "nombre email, role, google");
     
     
     res.json({
         ok:true,
         msg:"put"
     });
 }
 const deleteMedicos = async(req,res)=>{

    // const usuarios =await Usuario.find({}, "nombre email, role, google");
     
     
     res.json({
         ok:true,
         msg:"delete"
     });
 }


module.exports = {
    getMedicos,
    postMedicos,
    PutMedicos,
    deleteMedicos
    
}