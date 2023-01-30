const  mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
const urlMongoAtlas = "mongodb+srv://admin:admin123456@jmlopezbd.ej5nwwo.mongodb.net/JmlopezBD";

mongoose.connect(urlMongoAtlas, (err,res)=>{
    try{
        if(err){
            throw err
        } else {
            console.log("La conexión a la BD es corecta");
            app.listen(port, ()=>{
                console.log("Servidor del API REST está funcionando en http://localhost:"+port);
            })
        }
    }catch(error){
        console.log(error);
    }
})
