const pedidoOperaciones = require("../operaciones/PedidoOperaciones");
const router = require("express").Router();

router.get("/", pedidoOperaciones.buscarPedidos);
router.post("/", pedidoOperaciones.crearPedido);
router.get("/:id", pedidoOperaciones.buscarPedido);
router.put("/:id", pedidoOperaciones.modificarPedido);
router.delete("/:id", pedidoOperaciones.borrarPedido);

module.exports = router;