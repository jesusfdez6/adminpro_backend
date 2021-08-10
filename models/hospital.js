const {Schema,model} = require('mongoose'); //trael el esquema y el model


const HospitalSchema = Schema({

    nombre : {

        type:String,
        required:true 
    },
   
    img:{

        type:String
    },
    usuario : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'usuario'
    }
    
},{collection: "hospitales"});

HospitalSchema.method('toJSON', function(){

    const {__v,_id,...Object} =this.toObject();
    Object.id=_id;

    return Object;
});

module.exports = model('hospital',HospitalSchema)





