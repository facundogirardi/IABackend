// Gettign the Newly created Mongoose Model we just created
var Sueldo = require("../models/Sueldo.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Sueldos List
exports.getSueldos = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    var Sueldos = await Sueldo.paginate(query, options);
    // Return the Sueldos list that was retured by the mongoose promise
    return Sueldos;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Sueldos");
  }
};

exports.createSueldoM = async function (sueldo) {
  // Creating a new Mongoose Object by using the new keyword

  // Lo envian por Postman

  try {
    // Saving the Sueldo
    var savedSueldo = await Sueldo.insertMany(sueldo);
    var token = jwt.sign(
      {
        id: savedSueldo._id,
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
    throw Error("Error while Creating Sueldo");
  }
};

exports.createSueldo = async function (sueldo) {
  // Creating a new Mongoose Object by using the new keyword
  var newSueldo = new Sueldo({
    cbu: sueldo.cbu,
    importe: sueldo.importe,
    descripciopn: sueldo.descripcion,
    date: new Date(),
  });

  try {
    // Saving the Sueldo
    var savedSueldo = await newSueldo.save();
    var token = jwt.sign(
      {
        id: savedSueldo._id,
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
    throw Error("Error while Creating Sueldo");
  }
};

exports.updateSueldo = async function (sueldo) {
  var id = { cbu: sueldo.cbu };

  try {
    //Find the old Sueldo Object by the Id
    var oldSueldo = await Sueldo.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Sueldo");
  }
  // If no old Sueldo Object exists return false
  if (!oldSueldo) {
    return false;
  }
  //Edit the Sueldo Object
  oldSueldo.cbu = sueldo.cbu;
  oldSueldo.importe = sueldo.importe;
  oldSueldo.descripcion = sueldo.descripcion;

  try {
    var savedSueldo = await oldSueldo.save();
    return savedSueldo;
  } catch (e) {
    throw Error("And Error occured while updating the Sueldo");
  }
};
