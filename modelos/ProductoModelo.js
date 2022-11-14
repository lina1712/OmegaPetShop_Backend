const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
   
    marca: { type: String, maxLength: 50, required: true, unique: false},
    nombre: { type: String, maxLength: 50, required: true, unique: false},
    descripcion: { type: String, maxLength: 120, required: true, unique: false},
    presentacion: { type: String, maxLength: 80, required: true, unique: false},
    precio: { type: Number, required: true, unique: false },
    categoria: { type: String, maxLength: 50, required: true, unique: false},
    subcategoria:{type: String, maxLength: 50, required: true, unique: false}
    }
);

module.exports = mongoose.model("productos", productoSchema);