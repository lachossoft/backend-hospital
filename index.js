require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config')

//crear el servidor de express

const app = express();

//validaciones de acceso a servidores

app.use( cors() );

//lectura y paseo del body

app.use( express.json() );

//base de datos 

dbConection();



//rutas

app.use('/api/usuarios', require('./routes/usuarios')); 

app.use('/api/login', require('./routes/auth'));

//hospitales

app.use('/api/hospitales', require('./routes/hospitales')); 

//medicos

app.use('/api/medicos', require('./routes/medicos')); 

//busqueda todo
app.use('/api/todo', require('./routes/busquedas'));

//uploads
app.use('/api/uploads', require('./routes/uploads'));


app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo  en puerto ' + process.env.PORT );
} );