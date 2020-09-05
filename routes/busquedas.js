/*
    localhost:3005/api/todos/:busqueda
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//ruta de obtener usuarios

router.get( '/:busqueda',validarJWT, getTodo);

router.get( '/coleccion/:tabla/:busqueda',validarJWT, getDocumentoColeccion);




module.exports = router