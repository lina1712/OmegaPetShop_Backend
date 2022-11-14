const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
   
    producto: {
        nombre:{type: String, maxLength: 50, required: true, unique: false},
        presentacion: { type: String, maxLength: 80, required: true, unique: false},
        precio: { type: Number, required: true, unique: false }
        }, 
    cantidad: { type: Number, required: true, unique: false},
    formapago: { type: String, maxLength: 50, required: true, unique: false},
    fecha:{type: Date, required: true, unique: false},
    correo: { type: String, maxLength: 80, required: true, unique: true }
});

module.exports = mongoose.model("pedidos", pedidoSchema);