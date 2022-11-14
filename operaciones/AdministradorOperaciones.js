const administradorModelo = require("../modelos/AdministradorModelo");
const bcrypt = require("bcrypt");
const administradorOperaciones = {};

const cifrarPassword = async (passw) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(passw, salt);
}

administradorOperaciones.crearAdministrador = async(req, res)=>{
    try {
        const body = req.body;
        body.passw = await cifrarPassword(body.passw);
        const administrador = new administradorModelo(body);
        const administradorGuardado = await administrador.save();
        res.status(201).send(administradorGuardado);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

administradorOperaciones.buscarAdministradores = async(req, res)=>{
    try {
        const filtro = req.query;
        let listaadministradores;
        if(filtro.q != null){
            listaadministradores = await administradorModelo.find ({
                "$or" :[
                    {"nombre":{$regex:filtro.q, $options:"i"}},
                    {"apellido":{$regex:filtro.q, $options:"i"}},
                ]
            });
        }
        else {
            listaadministradores = await administradorModelo.find(filtro)};
        res.status(200).send(listaadministradores);
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

administradorOperaciones.buscarAdministrador = async(req, res)=>{
    try {
        const id = req.params.id;
        const administrador = await administradorModelo.findById(id);
        if(administrador!=null){
            res.status(200).send(administrador);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
}

administradorOperaciones.modificarAdministrador = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.passw != null) {
            body.passw = await cifrarPassword(body.passw);
        }
        const administrador = {
            nombre: body.nombre,
            apellidos: body.apellidos,
            direccion: body.direccion,
            telefono: body.telefono,
            correo: body.correo,
            passw: body.passw
        }
        const administradorActualizado = await administradorModelo.findByIdAndUpdate(id, administrador, {new : true});
        if (administradorActualizado != null) {
            res.status(200).send(administradorActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala peticion");
    }
}

administradorOperaciones.borrarAdministrador = async(req, res)=>{
    try {
        const id = req.params.id;
        const administradorborrado = await administradorModelo.findByIdAndDelete(id);
        if(administradorborrado!=null){
            res.status(200).send(administradorborrado);
        } else {
            res.status(404).send("No hay nada");
        }
    } catch (error) {
        res.status(400).send("Mala peticion"+error);
    }
    
}

module.exports = administradorOperaciones;
