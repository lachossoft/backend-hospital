const { res } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


//obitne lista de usuarios

const getUsuarios = async (req, res) =>{ 

    const usuario = await Usuario.find({}, 'nombre email role google' );

    res.status(200).json({
        ok: true,
        msg: "getusuario",
        usuario,
    });
}


//crea usuarios

const crearUsuarios = async (req, res) =>{ 

    const { email, password, nombre } = req.body;

    

    try{

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        
        const usuario = new  Usuario(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuario
    
        await usuario.save();
        
        //generar token

        const token = await generarJWT(usuario.id);
    

        res.status(200).json({
            ok: true,
            msg: "crearusuario",
            usuario,
            token
        });


    }
    catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

//actualiza usuarios

const actualizarUsuario = async(req, res) =>{
    
    // validat token y comprobar si es el usuario correcto

    const uid = req.params.id;
    

    try{

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }

        //actualizar

        const { password, google, email, ...campos  } = req.body;
        
        if(usuarioDB.email != email){
            
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }

        campos.email = email;


        const usuarioActualizao = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizao
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

//borrar usuario

const borrarUsuario = async (req, res) =>{


    try{
        
        const uid = req.params.id;

        //buscar usuarios por id

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }

        //borrar usuario

        await Usuario.findByIdAndDelete(uid);



        res.json({
            ok:true,
            uid,
            msg: 'Usuario eliminado'
        });




    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

module.exports={
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}