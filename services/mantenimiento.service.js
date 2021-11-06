// Gettign the Newly created Mongoose Model we just created
var Mantenimiento = require("../models/Mantenimiento.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Mantenimientos List
exports.getMantenimientos = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    var Mantenimientos = await Mantenimiento.paginate(query, options);
    // Return the Mantenimientos list that was retured by the mongoose promise
    return Mantenimientos;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Mantenimientos");
  }
};


exports.createMatenimiento = async function (mantenimiento) {
  // Creating a new Mongoose Object by using the new keyword
  var newMatenimiento = new Mantenimiento({
    clave: mantenimiento.clave,
    mantenimientoF: mantenimiento.mantenimientoF,
    interes: mantenimiento.interes,
    descubiertoF: mantenimiento.descubiertoF,
    mantenimientoJ: mantenimiento.mantenimientoJ,
    descubiertoJ: mantenimiento.descubiertoJ,
    descripcion: mantenimiento.descripcion,
    date: new Date(),
 

  });

  try {
    // Saving the Mantenimiento
    var savedMatenimiento = await newMatenimiento.save();
    var token = jwt.sign(
      {
        id: savedMatenimiento._id,
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
    throw Error("Error while Creating Mantenimiento");
  }
};

exports.updateMantenimiento = async function (mantenimiento) {
  var id = { clave: mantenimiento.clave };

  try {
    //Find the old Mantenimiento Object by the Id
    var oldMantenimiento = await Mantenimiento.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Mantenimiento");
  }
  // If no old Mantenimiento Object exists return false
  if (!oldMantenimiento) {
    return false;
  }
  //Edit the Mantenimiento Object
  oldMantenimiento.clave = mantenimiento.clave;
  oldMantenimiento.mantenimientoF = mantenimiento.mantenimientoF;
  oldMantenimiento.descubiertoF = mantenimiento.descubiertoF;
  oldMantenimiento.mantenimientoJ = mantenimiento.mantenimientoJ;
  oldMantenimiento.descubiertoJ = mantenimiento.descubiertoJ;
  oldMantenimiento.interes = mantenimiento.interes;

  try {
    var savedMantenimiento = await oldMantenimiento.save();
    return savedMantenimiento;
  } catch (e) {
    throw Error("And Error occured while updating the Mantenimiento");
  }
};

// Recupero Usuario por codigo pago
exports.getMantenimientoClave = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Mantenimientos = await Mantenimiento.paginate(query, options);
    return Mantenimientos;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por codigoPago");
  }
};
