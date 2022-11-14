const loginOperaciones = require('../operaciones/LoginOperaciones');
const router = require('express').Router();

router.post("/admin", loginOperaciones.loginAdministrador);
router.post("/user", loginOperaciones.loginCliente);


module.exports = router;