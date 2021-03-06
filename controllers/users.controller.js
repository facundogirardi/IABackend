var UserService = require("../services/user.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
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
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los usuarios" });
  }
};

exports.createUser = async function (req, res, next) {
  // Req.Body contains the form submit values.
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
    ciudad: req.body.ciudad,
    piso: req.body.piso,
    cbu: req.body.cbu,
    cbuCC: req.body.cbuCC,
    nrocuenta: req.body.nrocuenta,
    numerocajacc: req.body.numerocajacc,
    balancecc: req.body.balancecc,
    numerocajaca: req.body.numerocajaca,
    balanceca: req.body.balanceca,
    provincia: req.body.provincia,
    depto: req.body.depto,
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

// Traigo Usuario por CBU
exports.getUsuarioCBU = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cbu: req.body.cbu,
  };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);

    if (Users.total === 0)
      return res.status(201).json({
        status: 400,
        data: Users,
        message: "Error al querer obtener el usuario",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Users,
        message: "Usuario obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CBU CC
exports.getUsuarioCBUCC = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cbuCC: req.body.cbuCC,
  };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);

    if (Users.total === 0)
      return res.status(201).json({
        status: 201,
        data: Users,
        message: "Error al querer obtener el usuario",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Users,
        message: "Usuario obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por Usuario
exports.getUsuarioUsuario = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    usuario: req.body.usuario,
  };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);

    if (Users.total === 0)
      return res.status(201).json({
        status: 201,
        data: Users,
        message: "Error al querer obtener el usuario",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Users,
        message: "Usuario obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CUit
exports.getUsuarioCuit = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuit: req.body.cuit,
  };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);

    if (Users.total === 0)
      return res.status(201).json({
        status: 201,
        data: Users,
        message: "Error al querer obtener el usuario",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Users,
        message: "Usuario obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CUit
exports.getCuenta = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuit: req.params.id,
  };
  try {
    var Users = await UserService.getUsers(filtro, page, limit);

    if (Users.total === 0)
      return res.status(201).json({
        status: 201,
        cbu: Users.docs[0].cbu,
        message: "Error al querer obtener el CBU",
      });
    else
      return res.status(200).json({
        status: 200,
        cbu: Users.docs[0].cbu,
        message: "CBU obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: "Error al querer obtener el CBU" });
  }
};

exports.updateUser = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.usuario) {
    return res
      .status(400)
      .json({ status: 400, message: "CBU debe estar presente" });
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
    ciudad: req.body.ciudad ? req.body.ciudad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    cbuCC: req.body.cbuCC ? req.body.cbuCC : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc: req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc: req.body.balancecc ? req.body.balancecc : null,
    numerocajaca: req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca: req.body.balanceca ? req.body.balanceca : null,
    provincia: req.body.provincia ? req.body.provincia : null,
    depto: req.body.depto ? req.body.depto : null,
  };
  try {
    var updatedUser = await UserService.updateUser(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Usuario actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el usuario" });
  }
};

exports.updateUserCBU = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.cbu) {
    return res
      .status(400)
      .json({ status: 400, message: "CBU debe estar presente" });
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
    ciudad: req.body.ciudad ? req.body.ciudad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    cbuCC: req.body.cbuCC ? req.body.cbuCC : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc: req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc: req.body.balancecc ? req.body.balancecc : null,
    numerocajaca: req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca: req.body.balanceca ? req.body.balanceca : null,
    provincia: req.body.provincia ? req.body.provincia : null,
    depto: req.body.depto ? req.body.depto : null,
  };
  try {
    var updatedUser = await UserService.updateUserCBU(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Cuenta actualizada correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar la cuenta" });
  }
};

exports.updateUserCUIT = async function (req, res, next) {
  // Id is necessary for the update
  if (!cuit.body.cuit) {
    return res
      .status(400)
      .json({ status: 400, message: "CUIT debe estar presente" });
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
    ciudad: req.body.ciudad ? req.body.ciudad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    cbuCC: req.body.cbuCC ? req.body.cbuCC : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc: req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc: req.body.balancecc ? req.body.balancecc : null,
    numerocajaca: req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca: req.body.balanceca ? req.body.balanceca : null,
    provincia: req.body.provincia ? req.body.provincia : null,
    depto: req.body.depto ? req.body.depto : null,
  };
  try {
    var updatedUser = await UserService.updateUserCUIT(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Deposito realizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer realizar el deposito" });
  }
};

exports.updateUserP = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.cbu) {
    return res
      .status(400)
      .json({ status: 400, message: "CBU debe estar presente" });
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
    ciudad: req.body.ciudad ? req.body.ciudad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    cbuCC: req.body.cbuCC ? req.body.cbuCC : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc: req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc: req.body.balancecc ? req.body.balancecc : null,
    numerocajaca: req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca: req.body.balanceca ? req.body.balanceca : null,
    provincia: req.body.provincia ? req.body.provincia : null,
    depto: req.body.depto ? req.body.depto : null,
  };
  try {
    var updatedUser = await UserService.updateUserP(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Cuenta actualizada correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar la cuenta" });
  }
};

exports.updateUserCBUCC = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.cbu) {
    return res
      .status(400)
      .json({ status: 400, message: "CBU debe estar presente" });
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
    ciudad: req.body.ciudad ? req.body.ciudad : null,
    piso: req.body.piso ? req.body.piso : null,
    cbu: req.body.cbu ? req.body.cbu : null,
    cbuCC: req.body.cbuCC ? req.body.cbuCC : null,
    nrocuenta: req.body.nrocuenta ? req.body.nrocuenta : null,
    numerocajacc: req.body.numerocajacc ? req.body.numerocajacc : null,
    balancecc: req.body.balancecc ? req.body.balancecc : null,
    numerocajaca: req.body.numerocajaca ? req.body.numerocajaca : null,
    balanceca: req.body.balanceca ? req.body.balanceca : null,
    provincia: req.body.provincia ? req.body.provincia : null,
    depto: req.body.depto ? req.body.depto : null,
  };
  try {
    var updatedUser = await UserService.updateUserCBUCC(User);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Cuenta actualizada correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar la cuenta" });
  }
};

exports.loginUser = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var User = {
    usuario: req.body.usuario,
    password: req.body.password,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var loginUser = await UserService.loginUser(User);
    return res
      .status(201)
      .json({ loginUser, message: "Usuario loggeado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer loggear el usuario" });
  }
};
