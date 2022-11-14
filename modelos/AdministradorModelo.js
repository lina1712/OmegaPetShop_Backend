const mongoose = require("mongoose");

const administradorSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 50, required: true, unique: false},
    apellidos: { type: String, maxLength: 50, required: true, unique: false},
    tipodocumento:{type:String, maxLength:50, required:true,unique:false},
    documento: { type: Number, required: true, unique: true },
    direccion: { type: String, maxLength: 80, required: true, unique: false},
    telefono: { type: Number, required: true, unique: false },
    correo: { type: String, maxLength: 80, required: true, unique: true },
    passw: { type: String, required: true }
});

module.exports = mongoose.model("administradores", administradorSchema);