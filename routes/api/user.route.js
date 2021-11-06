var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/users.controller");
var EmpresaController = require("../../controllers/empresas.controller");
var MovimientoController = require("../../controllers/movements.controller");
var SueldoController = require("../../controllers/sueldos.controller");
var ClearingController = require("../../controllers/clearings.controller");
var TarjetaController = require("../../controllers/tarjetas.controller");
var ComercioController = require("../../controllers/pagocomercio.controller");
var MantenimientoController = require("../../controllers/mantenimientos.controller");
var Authorization = require("../../auth/authorization");

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("Llegaste a la ruta de api/user.routes");
});
router.post("/registration", UserController.createUser);
router.post("/login/", UserController.loginUser);
router.get("/getusers", UserController.getUsers);
router.put("/updateusers", UserController.updateUser);
router.put("/updateusercbu", UserController.updateUserCBU);
router.put("/updateUserCUIT", UserController.updateUserCUIT);
router.put("/updateusercbuCC", UserController.updateUserCBU);
router.put("/updateUserP", UserController.updateUserP);
router.post("/getusersCBU", UserController.getUsuarioCBU);
router.post("/getusersCBUCC", UserController.getUsuarioCBUCC);
router.post("/getusersUsuario", UserController.getUsuarioUsuario);
router.post("/getUsuarioCuit", UserController.getUsuarioCuit);

router.post("/altaempresa", EmpresaController.createEmpresa);
router.post("/altaempresaM", EmpresaController.createEmpresaM);
router.get("/getempresas", EmpresaController.getEmpresas);
router.put("/updateEmpresa", EmpresaController.updateEmpresa);
router.post("/getEmpresaESTADO", EmpresaController.getEmpresaESTADO);
router.post("/getEmpresaPAGO", EmpresaController.getEmpresaPAGO);
router.post("/getEmpresaCUITEmpresa", EmpresaController.getEmpresaCUITEmpresa);
router.post("/getEmpresasID", EmpresaController.getEmpresasID);

router.post("/altasueldoM", SueldoController.createSueldoM);
router.post("/altasueldo", SueldoController.createSueldo);
router.get("/getSueldos", SueldoController.getSueldos);
router.put("/updateSueldo", SueldoController.updateSueldo);
router.get("/getSueldoCodigo", SueldoController.getSueldoCodigo);

router.post("/altaclearingM", ClearingController.createClearingM);
router.post("/altaclearing", ClearingController.createClearing);
router.get("/getClearings", ClearingController.getClearings);
router.get("/getClearingCUITD", ClearingController.getClearingCUITD);
router.get("/getClearingCUITP", ClearingController.getClearingCUITO);
router.get("/getClearingCUITO", ClearingController.getClearingCUITP);

router.post("/altatarjetaM", TarjetaController.createTarjetaM);
router.post("/altatarjeta", TarjetaController.createTarjeta);
router.get("/getTarjetas", TarjetaController.getTarjetas);
router.put("/updateTarjeta", TarjetaController.updateTarjeta);
router.post("/getTarjetaCUIT", TarjetaController.getTarjetaCUIT);
router.post("/getTarjetaCUITEmpresa", TarjetaController.getTarjetaCUITEmpresa);
router.post("/getTarjetaCodigo", TarjetaController.getTarjetaCodigo);

router.post("/altacomercioM", ComercioController.createComercioM);
router.post("/altacomercio",  ComercioController.createComercio);
router.get("/getComercios", ComercioController.getComercios);
router.put("/updateComercio", ComercioController.updateComercio);
router.post("/getComercioCUIT", ComercioController.getComercioCUIT);
router.post("/getComercioCUITEmpresa", ComercioController.getComercioCUITEmpresa);
router.post("/getComercioCodigo", ComercioController.getComercioCodigo);

router.post("/registromovimiento", MovimientoController.createMovimiento);
router.get("/getmovimientos", MovimientoController.getMovimientos);
router.post("/getMovimientoUsuario", MovimientoController.getMovimientoUsuario);

router.get("/getMantenimientos", MantenimientoController.getMantenimientos);
router.post("/createMatenimiento", MantenimientoController.createMatenimiento);
router.put("/updateMantenimiento", MantenimientoController.updateMantenimiento);
router.post(
  "/getMantenimientoClave",
  MantenimientoController.getMantenimientoClave
);

// Export the Router
module.exports = router;

//api/users
//api/users/registration
//api/users/login
