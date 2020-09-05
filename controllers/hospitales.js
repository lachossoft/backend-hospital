
const { response } = require('express');

const Hospital = require('../models/hostipal');

const getHospitales = async (req, res = response) =>{



    try{
        const hospitales = await Hospital.find({} ,'id nombre').populate('usuario','nombre');

        if(!hospitales){
            return res.status(404).send({
                ok: false,
                msg: 'No hay hospitales registrados'
            });    
        }

        res.status(200).send({
            ok: true,
            hospitales
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }



}

const creaHospitales = async (req, res) =>{

    const uid = req.uid;

    const hospital = new Hospital ({
        usuario: uid,
        ...req.body
    });
    

    try{

        await hospital.save();


        res.status(200).send({
            ok: true,
            msg: "crear Hospital",
            hospital
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }



}

const actualizaHospitales = (req, res) =>{

    res.status(200).send({
        ok: true,
        msg: 'Hola'
    });

}

const borraHospitales = (req, res) =>{

    res.status(200).send({
        ok: true,
        msg: 'Hola'
    });

}

module.exports = {
    getHospitales,
    creaHospitales,
    actualizaHospitales,
    borraHospitales
}