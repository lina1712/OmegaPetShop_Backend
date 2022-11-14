const administradorOperaciones = require("../operaciones/AdministradorOperaciones");
const router = require("express").Router();

router.get("/", administradorOperaciones.buscarAdministradores);
router.post("/", administradorOperaciones.crearAdministrador);
router.get("/:id", administradorOperaciones.buscarAdministrador);
router.put("/:id", administradorOperaciones.modificarAdministrador);
router.delete("/:id", administradorOperaciones.borrarAdministrador);

module.exports = router;