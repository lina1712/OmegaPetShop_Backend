//importacion
const express = require('express');
const morgan = require ('morgan');
const cors = require ('cors');
const mongoose = require("./conexion");

//configuracion
const app = express();
const env = process.env;
const port = env.PORT || 3080;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Arranque
app.listen(port, () => {
    console.log("API iniciado en puerto " + port);
});

//Rutas base
app.get('/', (req, res) => {
    res.send("API iniciado");
});
app.use("/api/clientes", require("./rutas/ClienteRutas"));
app.use("/api/productos", require("./rutas/ProductoRutas"));
app.use("/api/administradores", require("./rutas/AdministradorRutas"));
app.use("/api/categorias", require("./rutas/CategoriaRutas"));
app.use("/api/pedidos", require("./rutas/PedidoRutas"));
app.use("/api/ventas", require("./rutas/VentaRutas"));
app.use("/api/login", require("./rutas/LoginRutas"));