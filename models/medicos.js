const {Schema,model} = require('mongoose'); //trael el esquema y el model


const MedicosSchema = Schema({

    nombre : {

        type:String,
        required:true 
    },
   
    img:{

        type:String
    },
    usuario : {
        type : Schema.Types.ObjectId,
        ref: 'usuario',
        required:true
    },
    hospital : {
        type : Schema.Types.ObjectId,
        ref: 'hospital',
        required:true
    }    
});

MedicosSchema.method('toJSON', function(){

    const {__v,_id,...Object} =this.toObject();
    Object.id=_id;

    return Object;
});

module.exports = model('medico',MedicosSchema)



