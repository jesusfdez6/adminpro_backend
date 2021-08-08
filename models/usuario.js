const {Schema,model} = require('mongoose'); //trael el esquema y el model


const UsuarioSchema = Schema({

    nombre : {

        type:String,
        required:true 
    },
    email : {

        type:String,
        required:true,
        unique:true 
    },
    password:{

        type:String,
        required:true 
    },
    img:{

        type:String
    },
    roles:{

        type:String,
        required:true, 
        default:'USER_ROLE'
    },
    google:{

        type:Boolean,
        default:false
        
    },
    status:{
        type:Boolean,
        default:true
    }
});

UsuarioSchema.method('toJSON', function(){

    const {__v,_id,password,...Object} =this.toObject();
    Object.id=_id;

    return Object;
});

module.exports = model('usuario',UsuarioSchema)





