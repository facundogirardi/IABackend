var TarjetaService = require("../services/pagocomercio.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getComercios = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  try {
    var Tarjetas = await TarjetaService.getComercios({}, page, limit);
    // Return the Tarjetas list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Tarjetas,
      message: "Comercios obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los comercios" });
  }
};

exports.createComercio = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Tarjeta = [
    {
      cuit: req.body.cuit,
      codigotransaccion: req.body.codigotransaccion,
      cuitEmpresa: req.body.cuitEmpresa,
      importe: req.body.importe,
      fechaPago: req.body.fechaPago,
      pagado: req.body.pagado,
      descripcion: req.body.descripcion,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdTarjeta = await TarjetaService.createComercio(req.body);
    return res.status(201).json({
      createdTarjeta,
      message: "Comercio generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el comercio" });
  }
};

exports.createComercioM = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Tarjeta = [
    {
      cuit: req.body.cuit,
      codigotransaccion: req.body.codigotransaccion,
      cuitEmpresa: req.body.cuitEmpresa,
      importe: req.body.importe,
      fechaPago: req.body.fechaPago,
      pagado: req.body.pagado,
      descripcion: req.body.descripcion,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdTarjeta = await TarjetaService.createComercioM(req.body);
    return res.status(201).json({
      createdTarjeta,
      message: "Comercio generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res

      .status(400)
      .json({ status: 400, message: "Error al querer generar el comercio, verifique los campos" });
  }
};

// Traigo Usuario por  CUIT
exports.getComercioCUIT = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuit: req.body.cuit,
  };
  try {
    var Tarjetas = await TarjetaService.getComercios(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener el comercio por CUIT",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Comercio obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CUIT
exports.getComercioCUITEmpresa = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuitEmpresa: req.body.cuitEmpreesa,
  };
  try {
    var Tarjetas = await TarjetaService.getComercios(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener el comercio",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Comercio obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo Usuario por CODIGO
exports.getComercioCodigo = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    codigotransaccion: req.body.codigotransaccion,
  };
  try {
    var Tarjetas = await TarjetaService.getComercios(filtro, page, limit);

    if (Tarjetas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Tarjetas,
        message: "Error al querer obtener el comercio, por codigotransaccion",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Tarjetas,
        message: "Comercio obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateComercio = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.codigotransaccion) {
    return res
      .status(400)
      .json({ status: 400, message: "Codigotransaccion tiene que estar presente" });
  }

  var Tarjeta = {
    cuit: req.body.cuit ? req.body.cuit : null,
    codigotransaccion: req.body.codigotransaccion ? req.body.codigotransaccion : null,
    importe: req.body.importe ? req.body.importe : null,
    descripcion: req.body.descripcion ? req.body.descripcion : null,
    cuitEmpresa: req.body.cuitEmpresa ? req.body.cuitEmpresa : null,
    pagado: req.body.pagado ? req.body.pagado : null,
    fechaPago: req.body.fechaPago ? req.body.fechaPago : null,
  };

  try {
    var updatedTarjeta = await TarjetaService.updateComercio(Tarjeta);
    return res.status(200).json({
      status: 200,
      data: updatedTarjeta,
      message: "Comercio actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el Comercio" });
  }
};
