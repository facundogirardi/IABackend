var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/users.controller");
var EmpresaController = require("../../controllers/empresas.controller");
var MovimientoController = require("../../controllers/movements.controller");
var MailController = require("../../controllers/mail.controller");
var Authorization = require("../../auth/authorization");

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("Llegaste a la ruta de api/user.routes");
});
router.post("/registration", UserController.createUser);
router.post("/login/", UserController.loginUser);
router.post("/loginATM/", UserController.loginUserATM);
router.get("/getusers", UserController.getUsers);
router.put("/updateMantenimiento", UserController.updateMantenimiento);
router.post("/userByMail", UserController.getUsersByMail);
router.put("/updateusers", UserController.updateUser);
router.put("/updateuseralias", UserController.updateUserALIAS);
router.put("/updateusercbu", UserController.updateUserCBU);
router.post("/userid/:id", UserController.getUsuarioID);
router.delete("/delete/:id", UserController.removeUser);
router.post("/getusers/:cbu", UserController.getUsuarioCBU);

router.post("/registromovimiento", MovimientoController.createMovimiento);
router.get("/getmovimientos", MovimientoController.getMovimientos);
router.post("/movimientoid/:id", MovimientoController.getMovimientoID);
router.post(
  "/getMovimientoUsuario/:usuario",
  MovimientoController.getMovimientoUsuario
);

router.post("/sendMail", MailController.sendEmail);

router.post("/altaempresa", EmpresaController.createEmpresa);
router.get("/getempresas", EmpresaController.getEmpresas);
router.put("/updateEmpresa", EmpresaController.updateEmpresa);
router.post("/empresaid/:id", EmpresaController.getEmpresaID);

// Export the Router
module.exports = router;

//api/users
//api/users/registration
//api/users/login
