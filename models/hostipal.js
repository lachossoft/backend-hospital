const { Schema, model } = require('mongoose');

const HospitalShema = Schema({
    nombre:{
        type:String,
        require: true
    },
    img:{
        type:String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales'});

HospitalShema.method('toJSON', function(){
    const {__V, _id, ...object } =  this.toObject();
    
    object.id = _id;

    return object;
});

module.exports = model('Hospital', HospitalShema);

