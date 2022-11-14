const mongoose = require("mongoose");

const ventaSchema = mongoose.Schema({

    fecha:{type: Date, required: true, unique: false},
    cliente: {
        nombre:{type: String, maxLength: 50, required: true, unique: false},
        apellidos: { type: String, maxLength: 50, required: true, unique: false},
        documento: { type: Number, required: true, unique: true },
        direccion: { type: String, maxLength: 80, required: true, unique: false},
        telefono: { type: Number, required: true, unique: false }
    },
    pedido: {
        producto:{
            nombre: {type: String, maxLength: 50, required: true, unique: false},
            presentacion: { type: String, maxLength: 80, required: true, unique: false},
            precio: { type: Number, required: true, unique: false }
        }, 
        cantidad: { type: Number, required: true, unique: false}
    },
    pago: { fecha:{type: Date, required: true, unique: false},
            aprobado:{type:Boolean, maxLength: 10, required:true,unique:true}},
    transportadora: {type: String, maxLength: 50, required: true, unique: false}
});

module.exports = mongoose.model("ventas", ventaSchema);