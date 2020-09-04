/* 

    rutas

    /api/usuarios

 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { getUsuarios, crearUsuarios, actualizarUsuario } = require('../controllers/usuarios')

const router = Router();

router.get( '/', getUsuarios);

router.post( '/', 
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos,
] , crearUsuarios ); 

router.put( '/:id', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
] ,actualizarUsuario);


module.exports = router