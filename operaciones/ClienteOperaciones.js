const clienteModelo = require("../modelos/ClienteModelo");
const bcrypt = require("bcrypt");
const clienteOperaciones = {}

const cifrarPassword = async (passw) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(passw, salt);
}

clienteOperaciones.crearCliente = async(req, res)=>{
    try {
        const objeto = req.body;
        body.passw = await cifrarPassword(body.passw);
        const cliente = new clienteModelo(objeto);
        const clienteGuardado = await cliente.save();
        res.status(201).send(clienteGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

clienteOperaciones.buscarClientes = async(req, res)=>{
    try {
        const filtro = req.query;
        let listaclientes;
        if(filtro.q != null){
            listaclientes = await clienteModelo.find ({
                "$or" :[
                    {"nombre":{$regex:filtro.q, $options:"i"}},
                    {"apellido":{$regex:filtro.q, $options:"i"}},
                    {"documento":{$regex:filtro.q, $options:"i"}},
                ]
            });
        }
        else {
            listaclientes = await clienteModelo.find(filtro)};
        if(listaclientes.length > 0){
            res.status(200).send(listaclientes);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

clienteOperaciones.buscarCliente = async(req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findById(id);
        if(cliente!=null){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

clienteOperaciones.modificarCliente = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const objeto = {
            nombre: body.nombre,
            apellidos: body.apellido,
            direccion: body.direccion,
            telefono: body.telefono,
            passw: body.passw
        }
        const clienteActualizado = await clienteModelo.findByIdAndUpdate(id, objeto, {new : true});
        if (clienteActualizado != null) {
            res.status(200).send(clienteActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion");
    }
}

clienteOperaciones.borrarCliente = async(req, res)=>{
    try {
        const id = req.params.id;
        const clienteborrado = await clienteModelo.findByIdAndDelete(id);
        if(clienteborrado!=null){
            res.status(200).send(clienteborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

module.exports = clienteOperaciones;
