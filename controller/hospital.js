const {response,request} = require("express");
const Hospital = require('../models/hospital');


const getHospital = async(req,res)=>{

    const hospitales =await Hospital.find()
    .populate("usuario","nombre img");
    
    
    res.json({
        ok:true,
        hospitales
    });
}
const postHospital = async(req,res)=>{
     const uid =req.uid;
     const hospital = new Hospital({
         usuario :uid,
         ...req.body
     });
     
 
     try {
         
        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok:true,
            hospital : hospitalDB
        });


     } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        });
     }
    
 }
 const putHospital = async(req,res)=>{

    // const usuarios =await Usuario.find({}, "nombre email, role, google");
     
     
     res.json({
         ok:true,
         msg:"put"
     });
 }
 const deleteHospital = async(req,res)=>{

    // const usuarios =await Usuario.find({}, "nombre email, role, google");
     
     
     res.json({
         ok:true,
         msg:"delete"
     });
 }


module.exports = {
    getHospital,
    postHospital,
    putHospital,
    deleteHospital
    
}