const mongoose = require('mongoose');



const dbConnetion = async ()=>{

    try{
        await mongoose.connect(process.env.DBN_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    console.log("conectado");
    }catch(e){
        throw new Error("error");
    }
   

}


module.exports ={
    dbConnetion
}

