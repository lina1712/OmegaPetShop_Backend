const ventaOperaciones = require("../operaciones/VentaOperaciones");
const router = require("express").Router();

router.get("/", ventaOperaciones.buscarVentas);
router.post("/", ventaOperaciones.crearVenta);
router.get("/:id", ventaOperaciones.buscarVenta);
router.put("/:id", ventaOperaciones.modificarVenta);
router.delete("/:id", ventaOperaciones.borrarVenta);

module.exports = router;