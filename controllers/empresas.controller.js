var EmpresaService = require("../services/empresa.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getEmpresas = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Empresas = await EmpresaService.getEmpresas({}, page, limit);
    // Return the Empresas list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Empresas,
      message: "empresa obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los usuarios" });
  }
};

exports.createEmpresa = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Empresa = [
    {
      nombre: req.body.nombre,
      codigopago: req.body.codigopago,
      cuitEmpresa: req.body.cuitEmpresa,
      importe: req.body.importe,
      mes: req.body.mes,
      fechaVencimiento: req.body.fechaVencimiento,
      estado: req.body.estado,
      cuit: req.body.cuit,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdEmpresa = await EmpresaService.createEmpresa(req.body);
    return res
      .status(201)
      .json({ createdEmpresa, message: "empresa generado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el empresa" });
  }
};

exports.updateEmpresa = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.codigopago) {
    return res
      .status(400)
      .json({ status: 400, message: "Nombre tiene que estar presente" });
  }

  var Empresa = {
    nombre: req.body.nombre ? req.body.nombre : null,
    codigopago: req.body.codigopago ? req.body.codigopago : null,
    cuitEmpresa: req.body.cuitEmpresa ? req.body.cuitEmpresa : null,
    importe: req.body.importe ? req.body.importe : null,
    mes: req.body.mes ? req.body.mes : null,
    fechaVencimiento: req.body.fechaVencimiento
      ? req.body.fechaVencimiento
      : null,
    estado: req.body.estado ? req.body.estado : null,
    cuit: req.body.cuit ? req.body.cuit : null,
  };

  try {
    var updatedEmpresa = await EmpresaService.updateEmpresa(Empresa);
    console.log("error", updatedEmpresa);
    return res.status(200).json({
      status: 200,
      data: updatedEmpresa,
      message: "Empresa actualizada correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el empresa" });
  }
};

// Traigo empresa por CUIT
exports.getEmpresaCUIT = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuit: req.body.cuit,
  };

  try {
    var Empresas = await EmpresaService.getEmpresaCUIT(filtro, page, limit);

    if (Empresas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Empresas,
        message: "Error al querer obtener el cuit",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "cuit obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo empresa por codigo Pago
exports.getEmpresaESTADO = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    estado: req.body.estado,
  };

  try {
    var Empresas = await EmpresaService.getEmpresaESTADO(filtro, page, limit);

    if (Empresas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Empresas,
        message: "Error al querer obtener el estado",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "estado obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo empresa por codigo Pago
exports.getEmpresaPAGO = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    codigopago: req.body.codigopago,
  };

  try {
    var Empresas = await EmpresaService.getEmpresaPAGO(filtro, page, limit);

    if (Empresas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Empresas,
        message: "Error al querer obtener el codigopago",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "codigopago obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo empresa por cuitEmpresa
exports.getEmpresaCUITEmpresa = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    cuitEmpresa: req.body.cuitEmpresa,
  };
  try {
    var Empresas = await EmpresaService.getEmpresaCUITEmpresa(
      filtro,
      page,
      limit
    );

    if (Empresas.total === 0)
      return res.status(201).json({
        status: 201,
        data: Empresas,
        message: "Error al querer obtener el cuitEmpresa",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "cuitEmpresa obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Traigo empresa por ID
exports.getEmpresasID = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    _id: req.body._id,
  };
  try {
    var Reporte = await EmpresaService.getEmpresasID(filtro, page, limit);

    if (Reporte.total === 0)
      return res.status(201).json({
        status: 201,
        data: Reporte,
        message: "No existe la empresa por ID",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Reporte,
        message: "Empresa por ID recuperada exitosamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
