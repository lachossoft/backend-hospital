
const Medico = require('../models/medico');

const getMedicos = async (req, res) =>{

    try{

        const medicos = await Medico.find().populate('usuario', 'id nombre')
                                           .populate('hospital','id nombre');

        if(!medicos){
            return res.status(404).send({
                ok: false,
                msg: 'No hay hospitales registrados'
            });
        }

        res.status(200).send({
            ok: true,
            medicos
        });



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

const creaMedicos = async (req, res) =>{

    const uid = req.uid;
    
    const medico = new Medico({ 
        
        usuario: uid,
        ...req.body
    });

    try{
        await medico.save();

        res.status(200).send({
            ok: true,
            msg: "crear Hospital",
            medico
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const actualizaMedicos = (req, res) =>{

    res.status(200).send({
        ok: true,
        msg: 'Hola'
    });
}

const borraMedicos = (req, res) =>{

    res.status(200).send({
        ok: true,
        msg: 'Hola'
    });
}

module.exports = {
    getMedicos,
    creaMedicos,
    actualizaMedicos,
    borraMedicos
}