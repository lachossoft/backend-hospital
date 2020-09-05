/*
    ruta
    /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { getHospitales, creaHospitales, actualizaHospitales, borraHospitales } = require('../controllers/hospitales');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//ruta de obtener hospitales

router.get( '/', validarJWT, getHospitales);

//ruta de crear hopitales

router.post( '/', 
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , creaHospitales ); 

//ruta de actualizar hopitales

router.put( '/:id', [
    
] ,actualizaHospitales);

//ruta de borrar hopitales

router.delete( '/:id', [
    
] ,borraHospitales);


module.exports = router