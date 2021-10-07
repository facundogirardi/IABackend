var SueldoService = require("../services/sueldo.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getSueldos = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Sueldos = await SueldoService.getSueldos({}, page, limit);
    // Return the Sueldos list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Sueldos,
      message: "sueldo obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los usuarios" });
  }
};

exports.createSueldo = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Sueldo = [
    {
      cbu: req.body.cbu,
      importe: req.body.importe,
      descripciopn: req.body.descripcion,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdSueldo = await SueldoService.createSueldo(req.body);
    return res
      .status(201)
      .json({ createdSueldo, message: "Sueldo de pago generado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el sueldo" });
  }
};
        
exports.createSueldoM = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Sueldo = [
    {
      cbu: req.body.cbu,
      importe: req.body.importe,
      descripciopn: req.body.descripcion,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdSueldo = await SueldoService.createSueldoM(req.body);
    return res
      .status(201)
      .json({ createdSueldo, message: "Sueldo de pago generado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el sueldo" });
  }
};

exports.updateSueldo = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.cbu) {
    return res
      .status(400)
      .json({ status: 400, message: "CBU tiene que estar presente" });
  }

  var Sueldo = {
    cbu: req.body.cbu ? req.body.cbu : null,
    importe: req.body.importe ? req.body.importe : null,
    descripciopn: req.body.descripcion ? req.body.descripcion : null,
  };

  try {
    var updatedSueldo = await SueldoService.updateSueldo(Sueldo);
    console.log("error", updatedSueldo);
    return res.status(200).json({
      status: 200,
      data: updatedSueldo,
      message: "Sueldo actualizado correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer actualizar el sueldo" });
  }
};