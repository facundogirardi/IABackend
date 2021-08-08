var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de api/user.routes');
  });
router.post('/registration',Authorization, UserController.createUser)
router.post('/login/',Authorization, UserController.loginUser)
router.get('/getusers',Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/updateusers', Authorization, UserController.updateUser)
router.post('/userid/:id', Authorization, UserController.getUsuarioID)
router.delete('/delete/:id', Authorization, UserController.removeUser)
router.post('/sendMail', Authorization, MailController.sendEmail)



// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login