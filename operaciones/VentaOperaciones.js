const ventaModelo = require("../modelos/VentaModelo");
const ventaOperaciones = {}

ventaOperaciones.crearVenta = async(req, res)=>{
    try {
        const objeto = req.body;
        const venta = new ventaModelo(objeto);
        const ventaGuardado = await venta.save();
        res.status(201).send(ventaGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

ventaOperaciones.buscarVentas = async(req, res)=>{
    try {
        const filtro = req.query;
        let listaventas;
        if(filtro.q != null){
            listaventas = await ventaModelo.find ({
                "$or" :[
                    {"fecha":{$regex:filtro.q, $options:"i"}}
                ]
            });
        }
        else {
            listaventas = await ventaModelo.find(filtro)};
        if(listaventas.length > 0){
            res.status(200).send(listaventas);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

ventaOperaciones.buscarVenta = async(req, res)=>{
    try {
        const id = req.params.id;
        const venta = await ventaModelo.findById(id);
        if(venta!=null){
            res.status(200).send(venta);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

ventaOperaciones.modificarVenta = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const venta = {
            cliente: body.cliente,
            transportadora: body.presentacion
        }
        const ventaActualizado = await ventaModelo.findByIdAndUpdate(id, venta, {new : true});
        if (ventaActualizado != null) {
            res.status(200).send(ventaActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}
    
ventaOperaciones.borrarVenta = async(req, res)=>{
    try {
        const id = req.params.id;
        const ventaborrado = await ventaModelo.findByIdAndDelete(id);
        if(ventaborrado!=null){
            res.status(200).send(ventaborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    } 
}

module.exports = ventaOperaciones;