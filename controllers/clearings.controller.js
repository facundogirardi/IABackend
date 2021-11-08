var ClearingService = require("../services/clearing.service");

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
      pagado: req.body.pagado,
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
      pagado: req.body.pagado,
      codigo: req.body.codigo,
    },
  ];

  try {
    // Calling the Service function with the new object from the Request Body
    var createdClearing = await ClearingService.createClearingM(req.body);
    return res.status(201).json({
      createdClearing,
      message: "Clearing de pago generado correctamente",
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e);
    return res

      .status(400)
      .json({
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
    return res
      .status(400)
      .json({
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
    pagado: req.body.pagado ? req.body.pagado : null,
    codigo: req.body.codigo ? req.body.codigo : null,
  };

  try {
    var updatedClearing = await ClearingService.updateClearing(Clearing);
    console.log("error", updatedClearing);
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
