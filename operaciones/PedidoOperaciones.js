const pedidoModelo = require("../modelos/PedidoModelo");
const pedidoOperaciones = {}

pedidoOperaciones.crearPedido = async(req, res)=>{
    try {
        const objeto = req.body;
        const pedido = new pedidoModelo(objeto);
        const pedidoGuardado = await pedido.save();
        res.status(201).send(pedidoGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

pedidoOperaciones.buscarPedidos = async(req, res)=>{
    try {
        const filtro = req.query;
        let listapedidos;
        if(filtro.q != null){
            listapedidos = await pedidoModelo.find ({
                "$or" :[
                    {"fecha":{$regex:filtro.q, $options:"i"}},
                    {"correo":{$regex:filtro.q, $options:"i"}},
                ]
            });
        }
        else {
            listapedidos = await pedidoModelo.find(filtro)};
        if(listapedidos.length > 0){
            res.status(200).send(listapedidos);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

pedidoOperaciones.buscarPedido = async(req, res)=>{
    try {
        const id = req.params.id;
        const pedido = await pedidoModelo.findById(id);
        if(pedido!=null){
            res.status(200).send(pedido);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

pedidoOperaciones.modificarPedido = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const pedido = {
            producto: body.producto,
            cantidad: body.cantidad,
            formapago: body.formapago
        }
        const pedidoActualizado = await pedidoModelo.findByIdAndUpdate(id, pedido, {new : true});
        if (pedidoActualizado != null) {
            res.status(200).send(pedidoActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}
    
pedidoOperaciones.borrarPedido = async(req, res)=>{
    try {
        const id = req.params.id;
        const pedidoborrado = await pedidoModelo.findByIdAndDelete(id);
        if(pedidoborrado!=null){
            res.status(200).send(pedidoborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    } 
}

module.exports = pedidoOperaciones;