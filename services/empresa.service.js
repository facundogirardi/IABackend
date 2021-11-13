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

exports.createEmpresaM = async function (empresa) {
  // Creating a new Mongoose Object by using the new keyword
 
  // Lo envian por Postman

  try {
    // Saving the Empresa
    var savedEmpresa = await Empresa.insertMany(empresa);
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

exports.createEmpresa = async function (empresa) {
  // Creating a new Mongoose Object by using the new keyword
  var newEmpresa = new Empresa({
    nombre: empresa.nombre,
    codigopago: empresa.codigopago,
    cuitEmpresa: empresa.cuitEmpresa,
    importe: empresa.importe,
    descripcion: empresa.descripcion,
    fechaVencimiento: empresa.fechaVencimiento,
    estado: "No pagado",
    debito: empresa.debito,
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
  var id = { codigopago: empresa.codigopago };

  try {
    //Find the old Empresa Object by the Id
    var oldEmpresa = await Empresa.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Empresa");
  }
  // If no old Empresa Object exists return false
  if (!oldEmpresa) {
    return false;
  }
  //Edit the Empresa Object
  oldEmpresa.nombre = empresa.nombre;
  oldEmpresa.codigopago = empresa.codigopago;
  oldEmpresa.cuitEmpresa = empresa.cuitEmpresa;
  oldEmpresa.importe = empresa.importe;
  oldEmpresa.descripcion = empresa.descripcion;
  oldEmpresa.fechaVencimiento = empresa.fechaVencimiento;
  oldEmpresa.estado = empresa.estado;
  oldEmpresa.cuit = empresa.cuit;
  oldEmpresa.debito = empresa.debito;

  try {
    var savedEmpresa = await oldEmpresa.save();
    return savedEmpresa;
  } catch (e) {
    throw Error("And Error occured while updating the Empresa");
  }
};

exports.updateEmpresaM = async function (empresa) {
  var id = { codigopago: empresa.codigopago };

  try {
    //Find the old Empresa Object by the Id
    var oldEmpresa = await Empresa.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Empresa");
  }
  // If no old Empresa Object exists return false
  if (!oldEmpresa) {
    return false;
  }
  //Edit the Empresa Object
  oldEmpresa.nombre = empresa.nombre;
  oldEmpresa.codigopago = empresa.codigopago;
  oldEmpresa.cuitEmpresa = empresa.cuitEmpresa;
  oldEmpresa.importe = empresa.importe;
  oldEmpresa.descripcion = empresa.descripcion;
  oldEmpresa.fechaVencimiento = empresa.fechaVencimiento;
  oldEmpresa.estado = empresa.estado;
  oldEmpresa.cuit = empresa.cuit;
  oldEmpresa.debito = empresa.debito;

  try {
    var savedEmpresa = await oldEmpresa.save();
    return savedEmpresa;
  } catch (e) {
    throw Error("And Error occured while updating the Empresa");
  }
};

// Recupero Usuario por estado
exports.getEmpresaESTADO = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Empresas = await Empresa.paginate(query, options);
    return Empresas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por estado");
  }
};

// Recupero Usuario por codigo pago
exports.getEmpresaPAGO = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Empresas = await Empresa.paginate(query, options);
    return Empresas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por codigoPago");
  }
};

// Recupero Usuario por Cuit Empresa
exports.getEmpresaCUITEmpresa = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Empresas = await Empresa.paginate(query, options);
    return Empresas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por CBU Empresa");
  }
};

// Recupero Empresa por ID
exports.getEmpresasID = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Reportes = await Empresa.paginate(query, options);
    return Reportes;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las reportes por ID");
  }
};
