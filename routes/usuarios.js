/* 

    rutas

    /api/usuarios

 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//ruta de obtener usuarios

router.get( '/', validarJWT, getUsuarios);

//ruta de crear usuarios

router.post( '/', 
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos,
] , crearUsuarios ); 

//ruta de actualizar usuarios

router.put( '/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
] ,actualizarUsuario);

//ruta de borrar usuarios

router.delete( '/:id', [
    validarJWT
] ,borrarUsuario);


module.exports = router