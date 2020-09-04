const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) =>{

    //leer el token

    const token = req.header('x-token');

    //validar que exista el token

    if(!token){
        return res.status(401).send({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.KEY);

        req.uid = uid;


    }catch(err){
        res.status(401).send({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}

module.exports ={
    validarJWT
}