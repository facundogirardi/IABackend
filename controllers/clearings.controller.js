var ClearingService = require("../services/clearing.service");
var UserService = require("../services/user.service");
var MovimientoService = require("../services/movement.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClearings = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  try {
    var Clearings = await ClearingService.getClearings({}, page, limit);
    // Return the Clearings list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Clearings,
      message: "clearings obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los clearings" });
  }
};

exports.createClearing = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Clearing = [
    {
      cbuPropio: req.body.cbuPropio,
      cbuUsuarioO: req.body.cbuUsuarioO,
      cbuUsuarioD: req.body.cbuUsuarioD,
      importe: req.body.importe,
      descripcion: req.body.descripcion,
      codigo: req.body.codigo,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdClearing = await ClearingService.createClearing(req.body);
    return res.status(201).json({
      createdClearing,
      message: "Clearing de pago generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el clearing" });
  }
};

exports.createClearingM = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Clearing = [
    {
      cbuPropio: req.body.cbuPropio,
      cbuUsuarioO: req.body.cbuUsuarioO,
      cbuUsuarioD: req.body.cbuUsuarioD,
      importe: req.body.importe,
      descripcion: req.body.descripcion,
      codigo: req.body.codigo,
    },
  ];

  try {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 1000;

    var filtro = {
      cbu: req.body.cbuUsuarioD,
    };
    var verifyClearing = await UserService.getUsers(filtro, page, limit);

    if (verifyClearing.total === 0)
      return res.status(400).json({
        status: 400,
        data: verifyClearing,
        message: "Error al querer obtener el clearing, usuario inexistente",
      });
    else var createdClearing = await ClearingService.createClearingM(req.body);

    // Traigo usuario destino
    var cbuUsuarioD = {
      cbu: req.body.cbuUsuarioD,
    };
    var usuarioD = await UserService.getUsuarioCBU(cbuUsuarioD, page, limit);

    usuarioD.docs[0].balanceca = parseInt(usuarioD.docs[0].balanceca) + parseInt(req.body.importe);

    var MovimientoD = {
      tipomovimiento: "Transferencia Externa - " + req.body.descripcion,
      importe: req.body.importe,
      importeCA: usuarioD.docs[0].balanceca + "",
      importeCC: usuarioD.docs[0].balancecc + "",
      usuario: usuarioD.docs[0].usuario,
    };
    var mantenimientoD = await MovimientoService.createMovimiento(MovimientoD);
    var updateD = await UserService.updateUserCBU(usuarioD.docs[0]);

    // Traigo usuario propio
    var cbuPropio = {
      cbu: req.body.cbuPropio,
    };
    var usuarioP = await UserService.getUsuarioCBUCC(cbuPropio, page, limit);

    usuarioP.docs[0].balanceca = parseInt(usuarioP.docs[0].balanceca) - parseInt(req.body.importe);

    var MovimientoP = {
      tipomovimiento: "Transferencia Externa - " + req.body.descripcion,
      importe: req.body.importe,
      importeCA: usuarioP.docs[0].balanceca + "",
      importeCC: usuarioP.docs[0].balancecc + "",
      usuario: usuarioP.docs[0].usuario,
    };
    var mantenimientoP = await MovimientoService.createMovimiento(MovimientoP);
    var updateP = await UserService.updateUserCBU(usuarioP.docs[0]);

    return res.status(200).json({
      status: 200,
      data: createdClearing,
      message: "Clearing generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: "Error al querer generar el clearing, verifique los campos",
    });
  }
};

// Traigo Usuario por CODIGO
exports.getClearingCBUD = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cbuUsuarioD: req.body.cbuUsuarioD,
  };
  try {
    var Clearings = await ClearingService.getClearings(filtro, page, limit);

    if (Clearings.total === 0)
      return res.status(201).json({
        status: 201,
        data: Clearings,
        message: "Error al querer obtener el clearing",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Clearings,
        message: "Clearing obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CODIGO
exports.getClearingCBUO = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cbuUsuarioO: req.body.cbuUsuarioO,
  };
  try {
    var Clearings = await ClearingService.getClearings(filtro, page, limit);

    if (Clearings.total === 0)
      return res.status(201).json({
        status: 201,
        data: Clearings,
        message: "Error al querer obtener el clearing",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Clearings,
        message: "Clearing obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CODIGO
exports.getClearingCodigo = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    codigo: req.body.codigo,
  };
  try {
    var Clearings = await ClearingService.getClearings(filtro, page, limit);

    if (Clearings.total === 0)
      return res.status(201).json({
        status: 201,
        data: Clearings,
        message: "Error al querer obtener el clearing",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Clearings,
        message: "Clearing obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateClearing = async function (req, res, next) {
  // Id is necessary for the update

  if (!req.body.codigo) {
    return res.status(400).json({
      status: 400,
      message: "El campo 'codigo' tiene que estar presente",
    });
  }
  var Clearing = {
    cbuPropio: req.body.cbuPropio ? req.body.cbuPropio : null,
    cbuUsuarioO: req.body.cbuUsuarioO ? req.body.cbuUsuarioO : null,
    cbuUsuarioD: req.body.cbuUsuarioD ? req.body.cbuUsuarioD : null,
    importe: req.body.importe ? req.body.importe : null,
    descripcion: req.body.descripcion ? req.body.descripcion : null,
    codigo: req.body.codigo ? req.body.codigo : null,
  };

  try {
    var updatedClearing = await ClearingService.updateClearing(Clearing);

    return res.status(200).json({
      status: 200,
      data: updatedClearing,
      message: "Clearing actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el clearing" });
  }
};

// Traigo Usuario por CODIGO
exports.getClearingCBUP = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cbuPropio: req.body.cbuPropio,
  };
  try {
    var Clearings = await ClearingService.getClearings(filtro, page, limit);

    if (Clearings.total === 0)
      return res.status(201).json({
        status: 201,
        data: Clearings,
        message: "Error al querer obtener el clearing",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Clearings,
        message: "Clearing obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
