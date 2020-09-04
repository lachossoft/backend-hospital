const mongoose = require('mongoose');

const dbConection = async () =>{

    try{
        
        mongoose.connect(process.env.DB_CN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useUnifiedTopology: true
        });
        console.log("Se establecio conexion con la DB");
    }
    catch (error){
        
        console.log(error);
        throw new Error('Error al establecer conexión con la base de datos, ver log');
    }


}

module.exports = {
    dbConection
}