/* 

    rutas

    /api/login

 */
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');


const router = Router();

router.post( '/',[
    check('email', 'El email es un campo obligatorio').isEmail(),
    check('password', 'El password es un campo obligatorio').not().isEmpty(),
    validarCampos,
], login );


module.exports=router;