const administradorModelo = require("../modelos/AdministradorModelo");
const clienteModelo = require("../modelos/ClienteModelo")
const bcrypt = require("bcrypt");

const loginOperaciones = {};

const compararPassw = async (recibido, guardado) => {
    return await bcrypt.compare(recibido, guardado);
}

loginOperaciones.loginAdministrador = async(req, res) => {
    try {
        const correo = req.body.correo;
        let passw = req.body.passw;
        const usuario = await administradorModelo.findOne({correo: correo});
        if (usuario != null) {
            const result = await compararPassw(passw, usuario.passw);
            if (result) {
                const acceso = {
                    nombre:usuario.nombre+" "+usuario.apellidos,
                }
                res.status(200).json(acceso);
            } 
            else {
                res.status(401).send("Email o contraseña incorrectos");    
            }
            
        }
        else {
            res.status(401).send("Email o contraseña incorrectos");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

loginOperaciones.loginCliente = async(req, res) => {
    try {
        const correo = req.body.correo;
        let passw = req.body.passw;
        const usuario = await clienteModelo.findOne({correo: correo});
        if (usuario != null) {
            const result = await compararPassw(passw, usuario.passw);
            if (result) {
                const acceso = {
                    nombre:usuario.nombre+" "+usuario.apellidos,
                }
                res.status(200).json(acceso);
            } 
            else {
                res.status(401).send("Email o contraseña incorrectos");    
            }
            
        }
        else {
            res.status(401).send("Email o contraseña incorrectos");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = loginOperaciones;