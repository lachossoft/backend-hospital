const { Schema, model } = require('mongoose');

const MedicoShema = Schema({
    nombre:{
        type:String,
        require: true
    },
    img:{
        type:String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
}, { collection: 'medicos'});

MedicoShema.method('toJSON', function(){
    const {__V, _id, ...object } =  this.toObject();
    
    object.id = _id;

    return object;
});

module.exports = model('Medico', MedicoShema);

