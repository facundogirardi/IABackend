var UserService = require("../services/user.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Users = await UserService.getUsers({}, page, limit);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Users,
      message: "Usuarios obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: "Error al querer obtener los usuarios"});
  }
};

exports.getUsersByMail = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  let filtro = { email: req.body.email };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Users,
      message: "Succesfully Users Recieved",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createUser = async function (req, res, next) {
  // Req.Body contains the form submit values.
  console.log("llegue al controller", req.body);
  var User = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    dni: req.body.dni,
    usuario: req.body.usuario,
    usuariotipo: req.body.usuariotipo,
    password: req.body.password,
    tipodni: req.body.tipodni,
    estadocuenta: req.body.estadocuenta,
    empresa: req.body.empresa,
    nacimiento: req.body.nacimiento,
    telefono: req.body.telefono,
    cuit: req.body.cuit,
    calle: req.body.calle,
    altura: req.body.altura,
    cuidad: req.body.cuidad,
    piso: req.body.piso,
    cbu: req.body.cbu,
    nrocuenta: req.body.nrocuenta,
    numerocajacc: req.body.numerocajacc,
    balancecc: req.body.balancecc,
    numerocajaca: req.body.numerocajaca,
    balanceca: req.body.balanceca,
    numerocajadls: req.body.numerocajadls,
    balancedls: req.body.balancedls,
    numerocajaeu: req.body.numerocajaeu,
    balanceeu: req.body.balanceeu,
    flageuro: req.body.flageuro,
    flagdolar: req.body.flagdolar,

  };
  try {
    // Calling the Service function with the new object from the Request Body
    var createdUser = await UserService.createUser(User);
    return res
      .status(201)
      .json({ createdUser, message: "Usuario generado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el usuario" });
  }
};

// Traigo Usuario por ID
exports.getUsuarioID = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
      _id: req.params.id
  }
  try {
      var Users = await UserService.getUsers(filtro, page, limit)

      if (Users.total === 0)
          return res.status(201).json({ status: 201, data: Users, message: "Error al querer obtener el usuario" });
      else
          return res.status(200).json({ status: 200, data: Users, message: "Usuario obtenido correctamente" });
  } catch (e) {

      console.log(e)
      return res.status(400).json({ status: 400, message: e.message });
  }
} 

// Traigo Usuario por CBU
exports.getUsuarioCBU = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
      cbu: req.params.cbu
  }
  try {
      var Users = await UserService.getUsers(filtro, page, limit)

      if (Users.total === 0)
          return res.status(201).json({ status: 201, data: Users, message: "Error al querer obtener el usuario" });
      else
          return res.status(200).json({ status: 200, data: Users, message: "Usuario obtenido correctamente" });
  } catch (e) {

      console.log(e)
      return res.status(400).json({ status: 400, message: e.message });
  }
} 

exports.updateUser = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.cbu) {
    return res.status(400).json({ status: 400, message: "CBU debe estar presente" });
  }

  var User = {
    nombre: req.body.nombre ? req.body.nombre : null,
    apellido: req.body.apellido ? req.body.apellido : null,
    email: req.body.email ? req.body.email : null,
    usuario: req.body.usuario ? req.body.usuario : null,
    dni: req.body.dni ? req.body.dni : null,
    password: req.body.password ? req.body.password : null,
    usuariotipo: req.body.usuariotipo ? req.body.usuariotipo : null,
    tipodni: req.body.tipodni ? req.body.tipodni : null,
    estadocuenta: req.body.estadocuenta ? req.body.estadocuenta : null,
    empresa: req.body.empresa ? req.body.empresa : null,
    nacimiento: req.body.nacimiento ? req.body.nacimiento : null,
    telefono: req.body.telefono ? req.body.telefono : null,
    cuit: req.body.cuit ? req.body.cuit : null,
    calle: req.body.calle ? req.body.calle : null,
    altura: req.body.altura ? req.body.altura : null,
    cuidad: req.body.cuidad ? req.body.cuidad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc : req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc : req.body.balancecc ? req.body.balancecc : null,
    numerocajaca : req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca : req.body.balanceca ? req.body.balanceca : null,
    numerocajadls : req.body.numerocajadls ? req.body.numerocajadls : null,
    balancedls : req.body.balancedls ? req.body.balancedls : null,
    numerocajaeu : req.body.numerocajaeu ? req.body.numerocajaeu : null,
    balanceeu : req.body.balanceeu ? req.body.balanceeu : null,
    flagdolar : req.body.flagdolar ? req.body.flagdolar : null,
    flageuro : req.body.flageuro ? req.body.flageuro : null

  };
  try {
    var updatedUser = await UserService.updateUser(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Usuario actualizado correctamente",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al querer actualizar el usuario"  });
  }
};

exports.removeUser = async function (req, res, next) {
  var id = req.params.id;
  try {
    var deleted = await UserService.deleteUser(id);
    res.status(200).send("Usuario eliminado correctamente");
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al querer eliminar el usuario" });
  }
};

exports.loginUser = async function (req, res, next) {
  // Req.Body contains the form submit values.
  console.log("body", req.body);
  var User = {
    usuario: req.body.usuario,
    password: req.body.password,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var loginUser = await UserService.loginUser(User);
    return res.status(201).json({ loginUser, message: "Usuario loggeado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer loggear el usuario" });
  }
};

exports.loginUserATM = async function (req, res, next) {
  // Req.Body contains the form submit values.
  console.log("body", req.body);
  var User = {
    dni: req.body.dni,
    password: req.body.password,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var loginUserATM = await UserService.loginUserATM(User);
    return res.status(201).json({ loginUserATM, message: "Usuario loggeado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer loggear el usuario" });
  }
};
