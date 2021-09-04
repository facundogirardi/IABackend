// Gettign the Newly created Mongoose Model we just created
var Empresa = require("../models/Empresa.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Empresas List
exports.getEmpresas = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    var Empresas = await Empresa.paginate(query, options);
    // Return the Empresas list that was retured by the mongoose promise
    return Empresas;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Empresas");
  }
};

exports.createEmpresa = async function (empresa) {
  // Creating a new Mongoose Object by using the new keyword
  var newEmpresa = new Empresa({
    nombre: empresa.nombre,
    codigopago: empresa.codigopago,
    importe: empresa.importe,
    mes: empresa.mes,
    fechaVencimiento: empresa.fechaVencimiento,
    estado: empresa.estado,
    cuit: empresa.cuit,
    date: new Date(),
  });

  try {
    // Saving the Empresa
    var savedEmpresa = await newEmpresa.save();
    var token = jwt.sign(
      {
        id: savedEmpresa._id,
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
    throw Error("Error while Creating Empresa");
  }
};

exports.updateEmpresa = async function (empresa) {
  var id = { nombre: empresa.nombre };

  try {
    //Find the old Empresa Object by the Id
    var oldEmpresa = await Empresa.findOne(id);
} catch (e) {
    throw Error("Error occured while Finding the Empresa")
}
// If no old Empresa Object exists return false
if (!oldEmpresa) {
    return false;
}
  //Edit the Empresa Object
  oldEmpresa.nombre = empresa.nombre
  oldEmpresa.codigopago = empresa.codigopago
  oldEmpresa.importe = empresa.importe
  oldEmpresa.mes = empresa.mes
  oldEmpresa.fechaVencimiento = empresa.fechaVencimiento
  oldEmpresa.estado = empresa.estado
  oldEmpresa.cuit = empresa.cuit

  try {

    var savedEmpresa = await oldEmpresa.save();
    return savedEmpresa;
  } catch (e) {
    throw Error("And Error occured while updating the Empresa");
  }
};

