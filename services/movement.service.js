// Gettign the Newly created Mongoose Model we just created
var Movimiento = require("../models/Movement.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");
var randomWords = require("random-words");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Movimiento List
exports.getMovimientos = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };

  // Try Catch the awaited promise to handle the error
  try {
    var Movimientos = await Movimiento.paginate(query, options);
    // Return the Movimiento list that was retured by the mongoose promise
    return Movimientos;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Movimientos");
  }
};

exports.createMovimiento = async function (movimiento) {
  // Creating a new Mongoose Object by using the new keyword
  var newMovimiento = new Movimiento({
    tipomovimiento: movimiento.tipomovimiento,
    importe: movimiento.importe,
    date: new Date()
  });
  try {
    // Saving the Movimiento
    var savedMovimiento = await newMovimiento.save();
    var token = jwt.sign(
      {
        id: savedMovimiento._id,
      },
      process.env.SECRET,
      {
        expiresIn: 15552000, // expires in 4 mounth
      }
    );
    return token;
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Movimiento");
  }
};

// Recupero Movimiento por ID
exports.getMovimientoID = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Movimientos = await Movimientos.paginate(query, options);
    return Movimientos;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Movimiento por ID");
  }
};

// Recupero Movimiento por Usuario
exports.getMovimientoUsuario = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Movimientos = await Movimientos.paginate(query, options);
    return Movimientos;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Movimiento por Usuario");
  }
};