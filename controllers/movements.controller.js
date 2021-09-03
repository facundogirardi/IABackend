var MovimientoService = require("../services/movement.service");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getMovimientos = async function (req, res, next) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Movimientos = await MovimientoService.getMovimientos({}, page, limit);
    // Return the Movimientos list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: Movimientos,
      message: "Movimientos obtenidos correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: "Error al querer obtener los movimientos"});
  }
};

exports.createMovimiento = async function (req, res, next) {
  // Req.Body contains the form submit values.
  var Movimiento = {
    tipomovimiento: req.body.tipomovimiento,
    importe: req.body.importe,
    importeCA: req.body.importeCA,
    importeCC: req.body.importeCC,
    usuario: req.body.usuario
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var createdMovimiento = await MovimientoService.createMovimiento(Movimiento);
    return res
      .status(201)
      .json({ createdMovimiento, message: "Movimiento generado correctamente" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res
      .status(400)
      .json({ status: 400, message: "Error al querer generar el movimiento" });
  }
};

// Traigo Usuario por ID
exports.getMovimientoID = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
      _id: req.params.id
  }
  try {
      var Movimientos = await MovimientoService.getMovimientos(filtro, page, limit)

      if (Movimientos.total === 0)
          return res.status(201).json({ status: 201, data: Movimientos, message: "Error al querer obtener el movimiento" });
      else
          return res.status(200).json({ status: 200, data: Movimientos, message: "Movimiento obtenido correctamente" });
  } catch (e) {

      console.log(e)
      return res.status(400).json({ status: 400, message: e.message });
  }
} 

// Traigo Usuario por Usuario
exports.getMovimientoUsuario = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;

  var filtro = {
      usuario: req.body.usuario
  }
  try {
      var Movimientos = await MovimientoService.getMovimientos(filtro, page, limit)

      if (Movimientos.total === 0)
          return res.status(201).json({ status: 201, data: Movimientos, message: "Error al querer obtener el movimiento" });
      else
          return res.status(200).json({ status: 200, data: Movimientos, message: "Movimiento obtenido correctamente" });
  } catch (e) {

      console.log(e)
      return res.status(400).json({ status: 400, message: e.message });
  }
} 