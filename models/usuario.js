const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
    nombre:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        require: true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default: false
    }
});

UsuarioShema.method('toJSON', function(){
    const {__V, _id, password, ...object } =  this.toObject();
    
    object.uid = _id;

    return object;
});

module.exports = model('Usuario', UsuarioShema);

