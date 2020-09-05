/*
    ruta
    /api/medicos

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { getMedicos, creaMedicos, actualizaMedicos, borraMedicos } = require('../controllers/medicos');
const { validarJWT } = require('../middleware/validar-jwt');
const validarJwt = require('../middleware/validar-jwt');

const router = Router();

//ruta de obtener medicos

router.get( '/', validarJWT, getMedicos);

//ruta de crear medicos

router.post( '/', 
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El id del hospital es obligatori').not().isMongoId(),
    validarCampos
] , creaMedicos ); 

//ruta de actualizar medicos

router.put( '/:id', [
    
] ,actualizaMedicos);

//ruta de borrar medicos

router.delete( '/:id', [
    
] ,borraMedicos);


module.exports = router