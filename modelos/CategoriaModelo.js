const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 50, required: true, unique: true},
    descripcion: { type: String, maxLength: 120, required: true, unique: false},
    subcategoria: {
        nombre:{ type: String, maxLength: 50, required: true, unique: false},
        descripcion:{ type: String, maxLength: 120, required: true, unique: false}
    }
    
});

module.exports = mongoose.model("categorias", categoriaSchema);