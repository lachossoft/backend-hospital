//getTodo

const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hostipal');


//busqueda en todas las tablas

const getTodo = async (req, res = response)=>{
    
    const dato = req.params.busqueda;
    const regex = new RegExp( dato, 'i' );


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.status(200).json({
        ok: true,
        msg: "busqueda todos",
        usuarios,
        medicos,
        hospitales
    });
}

//busqueda por tabla

const getDocumentoColeccion = async (req, res = response)=>{

    const tabla   = req.params.tabla;
    const dato    = req.params.busqueda;
    const regex   = new RegExp( dato, 'i' );

    let data = [];

    switch( tabla ){
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).send({
                ok: false,
                msg: 'La tabla tiene que ser usuario/medicos/hospitales'
            });
    }

    res.status(200).send({
        ok: true,
        resultados: data
    });


}


module.exports={
    getTodo,
    getDocumentoColeccion
}