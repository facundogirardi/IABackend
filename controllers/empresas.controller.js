var EmpresaService = require("../services/empresa.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getEmpresas = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  try {
    var Empresas = await EmpresaService.getEmpresas({}, page, limit);
    // Return the Empresas list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Empresas,
      message: "Cupones de Pago obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los cupones de Pago" });
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
      descripcion: req.body.descripcion,
      fechaVencimiento: req.body.fechaVencimiento,
      estado: req.body.estado,
      cuit: req.body.cuit,
      debito: req.body.debito,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdEmpresa = await EmpresaService.createEmpresa(req.body);
    return res
      .status(201)
      .json({
        createdEmpresa,
        message: "Cupon de pago generado correctamente",
      });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el cupon de pago, verifique los campos" });
  }
};

exports.createEmpresaM = async function (req, res, next) {
  // Req.Body contains the form submit values.

  try {
    // Calling the Service function with the new object from the Request Body
    var createdEmpresa = await EmpresaService.createEmpresaM(req.body);
    return res
      .status(201)
      .json({
        createdEmpresa,
        message: "Cupon de pago generado correctamente",
      });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el cupon de pago, verifique los campos" });
  }
};

exports.updateEmpresa = async function (req, res, next) {
  // Id is necessary for the update

  if (!req.body.codigopago) {
    return res
      .status(400)
      .json({ status: 400, message: "El campo 'codigopago' tiene que estar presente" });
  }
  var Empresa = {
    nombre: req.body.nombre ? req.body.nombre : null,
    codigopago: req.body.codigopago ? req.body.codigopago : null,
    cuitEmpresa: req.body.cuitEmpresa ? req.body.cuitEmpresa : null,
    importe: req.body.importe ? req.body.importe : null,
    descripcion: req.body.descripcion ? req.body.descripcion : null,
    fechaVencimiento: req.body.fechaVencimiento
      ? req.body.fechaVencimiento
      : null,
    estado: req.body.estado ? req.body.estado : null,
    cuit: req.body.cuit ? req.body.cuit : null,
    debito: req.body.debito ? req.body.debito : null,
  };
 
  try {
    var updatedEmpresa = await EmpresaService.updateEmpresa(Empresa);
 
    return res.status(200).json({
      status: 200,
      data: updatedEmpresa,
      message: "Cupon de pago actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el cupon de pago" });
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
        message: "Error al querer obtener el cupon de pago, por ESTADO",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "cupon de pago obtenido correctamente",
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
        message: "Error al querer obtener el cupon de pago, por CODIGOPAGO",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "cupon de pago obtenido correctamente",
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
        message: "Error al querer obtener el cupon de pago, por cuitEmpresa",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Empresas,
        message: "cupon de pago obtenido correctamente",
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
        message: "No existe la el cupon de pago por ese ID",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Reporte,
        message: "cupon de pago por ID recuperado exitosamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
