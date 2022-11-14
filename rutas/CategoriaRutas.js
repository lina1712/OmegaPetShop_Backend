const categoriaOperaciones = require("../operaciones/CategoriaOperaciones");
const router = require("express").Router();

router.get("/", categoriaOperaciones.buscarCategorias);
router.post("/", categoriaOperaciones.crearCategoria);
router.get("/:id", categoriaOperaciones.buscarCategoria);
router.put("/:id", categoriaOperaciones.modificarCategoria);
router.delete("/:id", categoriaOperaciones.borrarCategoria);

module.exports = router;