/*
    localhost:3005/api/uploads/<<Catalago>>/123
*/

const { Router } = require('express');

const expressfileUpload = require('express-fileupload');

const { validarCampos } = require('../middleware/validar-campos')

const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());

//ruta para subir archivos.

router.put( '/:tipo/:id',validarJWT, fileUpload );

//ruta para ver.

router.get( '/:tipo/:foto',validarJWT, retornaImagen );






module.exports = router