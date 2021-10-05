var MantenimientoService = require("../services/mantenimiento.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getMantenimientos = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Mantenimientos = await MantenimientoService.getMantenimientos(
      {},
      page,
      limit
    );
    // Return theMantenimientos list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Mantenimientos,
      message: "Mantenimiento obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer obtener los usuarios" });
  }
};

exports.updateMantenimiento = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body.clave) {
    return res
      .status(400)
      .json({ status: 400, message: "Clave tiene que estar presente" });
  }

  var Mantenimiento = {
    clave: req.body.clave ? req.body.clave : null,
    mantenimientoF: req.body.mantenimientoF ? req.body.mantenimientoF : null,
    descubiertoF: req.body.descubiertoF ? req.body.descubiertoF : null,
    mantenimientoJ: req.body.mantenimientoJ ? req.body.mantenimientoJ : null,
    descubiertoJ: req.body.descubiertoJ ? req.body.descubiertoJ : null,
    interes: req.body.interes ? req.body.interes : null,
  };

  try {
    var updatedMantenimiento =  await MantenimientoService.updateMantenimiento(Mantenimiento);
    console.log("error", updatedMantenimiento);
    return res.status(200).json({
      status: 200,
      data: updatedMantenimiento,
      message: "Mantenimiento actualizada correctamente",
    });
  } catch (e) {
    return res
      .status(400)
      .json({
        status: 400,
        message: "Error al querer actualizar el Mantenimiento",
      });
  }
};

// TraigoMantenimiento por codigo Pago
exports.getMantenimientoClave = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
    clave: req.body.clave,
  };

  try {
    var Mantenimientos = await MantenimientoService.getMantenimientoClave(
      filtro,
      page,
      limit
    );

    if (Mantenimientos.total === 0)
      return res.status(201).json({
        status: 201,
        data: Mantenimientos,
        message: "Error al querer obtener el Clave",
      });
    else
      return res.status(200).json({
        status: 200,
        data: Mantenimientos,
        message: "Clave obtenido correctamente",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
