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
    return res.status(400).json({ status: 400, message: "Error al querer obtener los usuarios"});
  }
};

exports.createEmpresa = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Empresa = {
    nombre: req.body.nombre,
    codigopago : req.body.codigopago,
    importe : req.body.importe,
    mes : req.body.mes,
    fechaVencimiento : req.body.fechaVencimiento,
    estado : req.body.estado,
    cuit : req.body.cuit,
   
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var createdEmpresa = await EmpresaService.createEmpresa(Empresa);
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
  if (!req.body.nombre) {
    return res.status(400).json({ status: 400, message: "Nombre tiene que estar presente" });
  }

  var Empresa = {
    nombre: req.body.nombre ? req.body.nombre : null ,
    codigopago : req.body.codigopago ? req.body.codigopago : null,
    importe : req.body.importe ? req.body.importe : null,
    mes : req.body.mes ? req.body.mes : null,
    fechaVencimiento : req.body.fechaVencimiento ? req.body.fechaVencimiento : null,
    estado : req.body.estado ? req.body.estado : null,
    cuit : req.body.cuit ? req.body.cuit : null

  };

  try {
    var updatedEmpresa = await EmpresaService.updateEmpresa(Empresa);
    console.log("error", updatedEmpresa)
    return res.status(200).json({
      status: 200,
      data: updatedEmpresa,
      message: "Empresa actualizada correctamente",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al querer actualizar el empresa"  });
  }
};
