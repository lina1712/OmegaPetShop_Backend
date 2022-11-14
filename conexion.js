const mongoose = require("mongoose");

const username = "admin";
const password = "admin";
const database = "OmegaPetShopBD";
const URI = "mongodb+srv://"+username+":"+password+"@cluster0.16chujz.mongodb.net/"+database+"?retryWrites=true&w=majority";

const conectar = async()=> {
    try{
       await mongoose.connect(URI);
        console.log("Atlas esta en linea");
    } catch (error) {
        console.log("Error de conexion. "+error);
    }


}
conectar();

module.exports = mongoose;