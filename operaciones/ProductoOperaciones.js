const productoModelo = require("../modelos/ProductoModelo");
const productoOperaciones = {}

productoOperaciones.crearProducto = async(req, res)=>{
    try {
        const objeto = req.body;
        const producto = new productoModelo(objeto);
        const productoGuardado = await producto.save();
        res.status(201).send(productoGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

productoOperaciones.buscarProductos = async(req, res)=>{
    try {
        const filtro = req.query;
        let listaproductos;
        if(filtro.q != null){
            listaproductos = await productoModelo.find ({
                "$or" :[
                    {"marca":{$regex:filtro.q, $options:"i"}},
                    {"nombre":{$regex:filtro.q, $options:"i"}},
                ]
            });
        }
        else {
            listaproductos = await productoModelo.find(filtro)};
        if(listaproductos.length > 0){
            res.status(200).send(listaproductos);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

productoOperaciones.buscarProducto = async(req, res)=>{
    try {
        const id = req.params.id;
        const producto = await productoModelo.findById(id);
        if(producto!=null){
            res.status(200).send(producto);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

productoOperaciones.modificarProducto = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const producto = {
            nombre: body.nombre,
            marca: body.marca,
            presentacion: body.presentacion,
            descripcion: body.descripcion,
            precio: body.precio
        }
        const productoActualizado = await productoModelo.findByIdAndUpdate(id, producto, {new : true});
        if (productoActualizado != null) {
            res.status(200).send(productoActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}
    
productoOperaciones.borrarProducto = async(req, res)=>{
    try {
        const id = req.params.id;
        const productoborrado = await productoModelo.findByIdAndDelete(id);
        if(productoborrado!=null){
            res.status(200).send(productoborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    } 
}

module.exports = productoOperaciones;