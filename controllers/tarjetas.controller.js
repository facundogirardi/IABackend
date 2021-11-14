var TarjetaService = require("../services/tarjeta.service");
var UserService = require("../services/user.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTarjetas = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  try {
    var Tarjetas = await TarjetaService.getTarjetas({}, page, limit);
    // Return the Tarjetas list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Tarjetas,
      message: "tarjeta obtenidas correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los tarjetas" });
  }
};

exports.createTarjeta = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Tarjeta = [
    {
      cuit: req.body.cuit,
      codigotransaccion: req.body.codigotransaccion,
      cuitEmpresa: req.body.cuitEmpresa,
      importe: req.body.importe,
      pagado: req.body.pagado,
      fechaVencimiento: req.body.fechaVencimiento,
      descripcion: req.body.descripcion,
    },
  ];

  try {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 1000;

    var filtro = {
      cuit: req.body.cuit,
    };
    var verifyClearing = await UserService.getUsuarioCuit(filtro, page, limit);

    if (verifyClearing.total === 0)
      return res.status(400).json({
        status: 400,
        data: verifyClearing,
        message: "Error al querer obtener el clearing, usuario inexistente",
      });
    // Calling the Service function with the new object from the Request Body
    else var createdTarjeta = await TarjetaService.createTarjeta(req.body);
    return res.status(201).json({
      createdTarjeta,
      message: "Tarjeta de pago generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el tarjeta" });
  }
};

exports.createTarjetaM = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Tarjeta = [
    {
      cuit: req.body.cuit,
      codigotransaccion: req.body.codigotransaccion,
      cuitEmpresa: req.body.cuitEmpresa,
      importe: req.body.importe,
      pagado: req.body.pagado,
      fechaVencimiento: req.body.fechaVencimiento,
      descripcion: req.body.descripcion,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdTarjeta = await TarjetaService.createTarjetaM(req.body);
    return res.status(201).json({
      createdTarjeta,
      message: "Tarjeta de pago generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: "Error al querer generar el tarjeta, verifique los campos",
    });
  }
};

// Traigo Usuario por  CUIT
exports.getTarjetaCUIT = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuit: req.body.cuit,
  };
  try {
    var Tarjetas = await TarjetaService.getTarjetas(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener la tarjeta",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Tarjeta obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CUIT
exports.getTarjetaCUITEmpresa = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuitEmpresa: req.body.cuitEmpreesa,
  };
  try {
    var Tarjetas = await TarjetaService.getTarjetas(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener la tarjeta",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Tarjeta obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CODIGO
exports.getTarjetaCodigo = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    codigotransaccion: req.body.codigotransaccion,
  };
  try {
    var Tarjetas = await TarjetaService.getTarjetas(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener la tarjeta",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Tarjeta obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateTarjeta = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.codigotransaccion) {
    return res.status(400).json({
      status: 400,
      message: "Codigotransaccion, tiene que estar presente",
    });
  }

  var Tarjeta = {
    cuit: req.body.cuit ? req.body.cuit : null,
    codigotransaccion: req.body.codigotransaccion
      ? req.body.codigotransaccion
      : null,
    importe: req.body.importe ? req.body.importe : null,
    descripcion: req.body.descripcion ? req.body.descripcion : null,
    cuitEmpresa: req.body.cuitEmpresa ? req.body.cuitEmpresa : null,
    pagado: req.body.pagado ? req.body.pagado : null,
    fechaVencimiento: req.body.fechaVencimiento
      ? req.body.fechaVencimiento
      : null,
  };

  try {
    var updatedTarjeta = await TarjetaService.updateTarjeta(Tarjeta);
    return res.status(200).json({
      status: 200,
      data: updatedTarjeta,
      message: "Tarjeta actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el tarjeta" });
  }
};
