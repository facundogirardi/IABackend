var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/users.controller");
var EmpresaController = require("../../controllers/empresas.controller");
var MovimientoController = require("../../controllers/movements.controller");
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
router.put("/updateusercbuCC", UserController.updateUserCBU);
router.post("/getusersCBU", UserController.getUsuarioCBU);
router.post("/getusersCBUCC", UserController.getUsuarioCBUCC);
router.post("/getusersUsuario", UserController.getUsuarioUsuario);
router.post("/getUsuarioCuit", UserController.getUsuarioCuit);

router.post("/altaempresa", EmpresaController.createEmpresa);
router.get("/getempresas", EmpresaController.getEmpresas);
router.put("/updateEmpresa", EmpresaController.updateEmpresa);
router.post("/getEmpresaCUIT", EmpresaController.getEmpresaCUIT);
router.post("/getEmpresaPAGO", EmpresaController.getEmpresaPAGO);
router.post("/getEmpresaCUITEmpresa", EmpresaController.getEmpresaCUITEmpresa);

router.post("/getEmpresasID", EmpresaController.getEmpresasID);

router.post("/registromovimiento", MovimientoController.createMovimiento);
router.get("/getmovimientos", MovimientoController.getMovimientos);
router.post("/getMovimientoUsuario", MovimientoController.getMovimientoUsuario);

// Export the Router
module.exports = router;

//api/users
//api/users/registration
//api/users/login
