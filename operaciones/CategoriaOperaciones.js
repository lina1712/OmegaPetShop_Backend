const categoriaModelo = require("../modelos/CategoriaModelo");
const categoriaOperaciones = {}

categoriaOperaciones.crearCategoria = async(req, res)=>{
    try {
        const objeto = req.body;
        const categoria = new categoriaModelo(objeto);
        const categoriaGuardado = await categoria.save();
        res.status(201).send(categoriaGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

categoriaOperaciones.buscarCategorias = async(req, res)=>{
    try {
        const filtro = req.query;
        let listacategorias;
        if(filtro.q != null){
            listacategorias = await categoriaModelo.find ({
                "$or" :[
                    {"nombre":{$regex:filtro.q, $options:"i"}}
                ]
            });
        }
        else {
            listacategorias = await categoriaModelo.find(filtro)};
        if(listacategorias.length > 0){
            res.status(200).send(listacategorias);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}
categoriaOperaciones.buscarCategoria = async(req, res)=>{
    try {
        const id = req.params.id;
        const categoria = await categoriaModelo.findById(id);
        if(categoria!=null){
            res.status(200).send(categoria);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

categoriaOperaciones.modificarCategoria = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const categoria = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            subacategoria:body.subacategoria,
        }
        const categoriaActualizado = await categoriaModelo.findByIdAndUpdate(id, categoria, {new : true});
        if (categoriaActualizado != null) {
            res.status(200).send(categoriaActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion");
    }
}

categoriaOperaciones.borrarCategoria = async(req, res)=>{
    try {
        const id = req.params.id;
        const categoriaborrado = await categoriaModelo.findByIdAndDelete(id);
        if(categoriaborrado!=null){
            res.status(200).send(categoriaborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

module.exports = categoriaOperaciones;
