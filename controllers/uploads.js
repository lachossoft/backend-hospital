const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizarimagen');




const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];


    if(!tiposValidos.includes(tipo)){
        return res.status(400).send({
            ok:false,
            msg: 'No es un hospital, médico o usuario'
        });
    }

    //validamos que exista un archivo

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    //procesar la imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    //validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).send({
            ok:false,
            msg: 'No es una extensión valida'
        });
    }

    //Generar el nombre del archivo

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //crar path para guardar imagen

    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //mover imagen al directorio que le corresponde.

    file.mv( path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).send({
                ok:false,
                msg: 'Error al mover la imagen'
            });
        }
    
        
      });

    //actualizar la base de datos.

    actualizarImagen( tipo, id, nombreArchivo )

    res.send({
        ok:true,
        msg: 'Archivo cargado',
        nombreArchivo
    });

} 

const retornaImagen = (req, res = response) =>{
    
    const tipo = req. params.tipo;
    const foto = req. params.foto;

    //controlador de directorios.

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //validar imagen que exista

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/default.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports={
    fileUpload,
    retornaImagen
}