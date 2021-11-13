// Gettign the Newly created Mongoose Model we just created
var Clearing = require("../models/Clearing.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Clearings List
exports.getClearings = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    var Clearings = await Clearing.paginate(query, options);
    // Return the Clearings list that was retured by the mongoose promise
    return Clearings;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Clearings");
  }
};

exports.createClearingM = async function (clearing) {
  // Creating a new Mongoose Object by using the new keyword

  // Lo envian por Postman

  try {
    // Saving the Clearing
    var savedClearing = await Clearing.insertMany(clearing);
    var token = jwt.sign(
      {
        id: savedClearing._id,
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
    throw Error("Error while Creating Clearing");
  }
};

// Recupero Usuario por CBU Empresa
exports.getClearingCBUD = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Clearings = await Clearing.paginate(query, options);
    return Clearings;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por ese Codigo");
  }
};

exports.updateClearing = async function (clearing) {
  var id = { codigo: clearing.codigo };

  try {
    //Find the old Empresa Object by the Id
    var oldClearing = await Clearing.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Clearing");
  }
  // If no old Empresa Object exists return false
  if (!oldClearing) {
    return false;
  }

  //Edit the Empresa Object
  oldClearing.cbuPropio = clearing.cbuPropio;
  oldClearing.cbuUsuarioO = clearing.cbuUsuarioO;
  oldClearing.cbuUsuarioD = clearing.cbuUsuarioD;
  oldClearing.importe = clearing.importe;
  oldClearing.descripcion = clearing.descripcion;
  oldClearing.codigo = clearing.codigo;

  try {
    var savedEmpresa = await oldClearing.save();
    return savedEmpresa;
  } catch (e) {
    throw Error("And Error occured while updating the Clearing");
  }
};

// Recupero Usuario por CBU Empresa
exports.getClearingCBUO = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Clearings = await Clearing.paginate(query, options);
    return Clearings;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por ese Codigo");
  }
};

// Recupero Usuario por CBU Empresa
exports.getClearingCBUP = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Clearings = await Clearing.paginate(query, options);
    return Clearings;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por ese Codigo");
  }
};

// Recupero Usuario por CBU Empresa
exports.getClearingCodigo = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Clearings = await Clearing.paginate(query, options);
    return Clearings;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por ese Codigo");
  }
};

exports.createClearing = async function (clearing) {
  // Creating a new Mongoose Object by using the new keyword
  var newClearing = new Clearing({
    cbuPropio: clearing.cbuPropio,
    cbuUsuarioO: clearing.cbuUsuarioO,
    cbuUsuarioD: clearing.cbuUsuarioD,
    importe: clearing.importe,
    descripcion: clearing.descripcion,
    codigo: clearing.codigo,
    date: new Date(),
  });

  try {
    // Saving the Clearing
    var savedClearing = await newClearing.save();
    var token = jwt.sign(
      {
        id: savedClearing._id,
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
    throw Error("Error while Creating Clearing");
  }
};
