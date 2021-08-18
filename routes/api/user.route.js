var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var EmpresaController = require('../../controllers/empresas.controller');
var MovimientoController = require('../../controllers/movements.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de api/user.routes');
  });
router.post('/registration',Authorization, UserController.createUser)
router.post('/login/',Authorization, UserController.loginUser)
router.post('/loginATM/',Authorization, UserController.loginUserATM)
router.get('/getusers',Authorization, UserController.getUsers)
router.put('/updateMantenimiento',Authorization, UserController.updateMantenimiento)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/updateusers', Authorization, UserController.updateUser)
router.put('/updateuseralias', Authorization, UserController.updateUserALIAS)
router.put('/updateusercbu', Authorization, UserController.updateUserCBU)
router.post('/userid/:id', Authorization, UserController.getUsuarioID)
router.delete('/delete/:id', Authorization, UserController.removeUser)
router.post('/getusers/:cbu', Authorization, UserController.getUsuarioCBU)

router.post('/registromovimiento',Authorization, MovimientoController.createMovimiento)
router.get('/getmovimientos',Authorization, MovimientoController.getMovimientos)
router.post('/movimientoid/:id', Authorization, MovimientoController.getMovimientoID)
router.post('/getMovimientoUsuario/:usuario', Authorization, MovimientoController.getMovimientoUsuario)


router.post('/sendMail', Authorization, MailController.sendEmail)

router.post('/altaempresa',Authorization, EmpresaController.createEmpresa)
router.get('/getempresas',Authorization, EmpresaController.getEmpresas)
router.put('/updateEmpresa', Authorization, EmpresaController.updateEmpresa)
router.post('/empresaid/:id', Authorization, EmpresaController.getEmpresaID)


// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login