const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hostipal');


const borraImagen = (pathViejo)=>{
    
    if(fs.existsSync( pathViejo)){
        fs.unlinkSync(pathViejo);
    }
}


const actualizarImagen = async (tipo, id, nombrearchivo) =>{

    let pathViejo;

    switch(tipo)
    {
        case 'medicos':

            const medico = await Medico.findById(id);

            //validar que existe

            if(!medico){
                console.log('No se encontro el médico');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            
            borraImagen(pathViejo);

            medico.img = nombrearchivo;

            await medico.save();

            return true;

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(id);

            //validar que existe

            if(!hospital){
                console.log('No se encontro el hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            
            borraImagen(pathViejo);

            hospital.img = nombrearchivo;

            await hospital.save();

            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);

            //validar que existe

            if(!usuario){
                console.log('No se encontro el usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            
            borraImagen(pathViejo);

            usuario.img = nombrearchivo;

            await usuario.save();

            return true;

            break;
    }
}

module.exports={
    actualizarImagen
}