// Gettign the Newly created Mongoose Model we just created
var Tarjeta = require("../models/Tarjeta.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Tarjetas List
exports.getTarjetas = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    var Tarjetas = await Tarjeta.paginate(query, options);
    // Return the Tarjetas list that was retured by the mongoose promise
    return Tarjetas;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Tarjetas");
  }
};

exports.createTarjetaM = async function (tarjeta) {
  // Creating a new Mongoose Object by using the new keyword

  // Lo envian por Postman

  try {
    // Saving the Tarjeta
    var savedTarjeta = await Tarjeta.insertMany(tarjeta);
    var token = jwt.sign(
      {
        id: savedTarjeta._id,
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
    throw Error("Error while Creating Tarjeta");
  }
};

exports.createTarjeta = async function (tarjeta) {
  // Creating a new Mongoose Object by using the new keyword
  var newTarjeta = new Tarjeta({
    cuit: tarjeta.cuit,
    codigotransaccion: random.int((min = 0), (max = 9999999999)),
    importe: tarjeta.importe,
    descripcion: tarjeta.descripcion,
    fechaPago: tarjeta.fechaPago,
    pagado: "0",
    cuitEmpresa: tarjeta.cuitEmpresa,
    date: new Date(),
  });

  try {
    // Saving the Tarjeta
    var savedTarjeta = await newTarjeta.save();
    var token = jwt.sign(
      {
        id: savedTarjeta._id,
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
    throw Error("Error while Creating Tarjeta");
  }
};

// Recupero Usuario por CUIT
exports.getTarjetaCUIT = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Tarjetas = await Tarjeta.paginate(query, options);
    return Tarjetas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuario por CUIT");
  }
};

// Recupero Usuario por CUIT Empresa
exports.getTarjetaCUITEmpresa = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Tarjetas = await Tarjeta.paginate(query, options);
    return Tarjetas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por CUITEmpresa");
  }
};

// Recupero Usuario por CUIT Empresa
exports.getTarjetaCodigo = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Tarjetas = await Tarjeta.paginate(query, options);
    return Tarjetas;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de los Usuarios por ese Codigo");
  }
};

exports.updateTarjeta = async function (tarjeta) {
  var id = { codigotransaccion: tarjeta.codigotransaccion };
 
  try {
    //Find the old Tarjeta Object by the Id
    var oldTarjeta = await Tarjeta.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Tarjeta");
  }
  // If no old Tarjeta Object exists return false
  if (!oldTarjeta) {
    return false;
  }
  //Edit the Tarjeta Object
  oldTarjeta.cuit = tarjeta.cuit;
  oldTarjeta.codigotransaccion = tarjeta.codigotransaccion;
  oldTarjeta.importe = tarjeta.importe;
  oldTarjeta.descripcion = tarjeta.descripcion;
  oldTarjeta.fechaPago = tarjeta.fechaPago;
  oldTarjeta.pagado = tarjeta.pagado;
  oldTarjeta.cuitEmpresa = tarjeta.cuitEmpresa;

  try {
    var savedTarjeta = await oldTarjeta.save();
    return savedTarjeta;
  } catch (e) {
    throw Error("And Error occured while updating the Tarjeta");
  }
};
