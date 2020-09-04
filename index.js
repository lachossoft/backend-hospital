require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config')

//crear el servidor de express

const app = express();

//validaciones de acceso a servidores

app.use( cors() );

//base de datos 

dbConection();






//rutas

app.get( '/', (req, res) =>{ 

    res.status(200).json({
        ok: true,
        msg: "Hola mundo"
    });

});


app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo  en puerto ' + process.env.PORT );
} );