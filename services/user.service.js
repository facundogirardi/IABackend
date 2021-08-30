// Gettign the Newly created Mongoose Model we just created
var User = require("../models/User.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const random = require("random");
var randomWords = require("random-words");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };

  // Try Catch the awaited promise to handle the error
  try {
    var Users = await User.paginate(query, options);
    // Return the Userd list that was retured by the mongoose promise
    return Users;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Users");
  }
};

exports.updateMantenimiento = async function (user) {
  var id = { usuario: user.usuario };

  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }
  console.log("usuario", oldUser);
  //Edit the User Object
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre;
  oldUser.apellido = user.apellido;
  oldUser.email = user.email;
  oldUser.dni = user.dni;
  oldUser.usuariotipo = user.usuariotipo;
  oldUser.usuario = user.usuario;
  oldUser.password = hashedPassword;
  oldUser.tipodni = user.tipodni;
  oldUser.estadocuenta = user.estadocuenta;
  oldUser.empresa = user.empresa;
  oldUser.nacimiento = user.nacimiento;
  oldUser.telefono = user.telefono;
  oldUser.cuit = user.cuit;
  oldUser.calle = user.calle;
  oldUser.altura = user.altura;
  oldUser.ciudad = user.ciudad;
  oldUser.piso = user.piso;
  oldUser.cbu = user.cbu;
  oldUser.cbuCC = user.cbuCC;
  oldUser.nrocuenta = user.nrocuenta;
  oldUser.numerocajacc = user.numerocajacc;
  oldUser.balancecc = user.balancecc;
  oldUser.numerocajaca = user.numerocajaca;
  oldUser.balanceca = user.balanceca;
  oldUser.alias = user.alias;
  oldUser.provincia = user.provincia;
  oldUser.depto = user.depto;

  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

exports.createUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  var newUser = new User({
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    dni: user.dni,
    date: new Date(),
    usuario: user.usuario,
    usuariotipo: user.usuariotipo,
    password: hashedPassword,
    tipodni: user.tipodni,
    estadocuenta: 2, // cuenta no activa
    empresa: user.empresa,
    nacimiento: user.nacimiento,
    telefono: user.telefono,
    cuit: user.cuit,
    calle: user.calle,
    altura: user.altura,
    ciudad: user.ciudad,
    provincia: user.provincia,
    depto: user.depto,
    piso: user.piso,
    alias: randomWords({ exactly: 3, join: "." }),
    cbu: random.int(
      (min = 1111111111111111111111),
      (max = 99999999999999999999)
    ),
    cbuCC: random.int(
      (min = 1111111111111111111111),
      (max = 99999999999999999999)
    ),
    nrocuenta: random.int((min = 0), (max = 9999999999)),
    numerocajacc: random.int((min = 0), (max = 9999999999)),
    balancecc: 0,
    numerocajaca: random.int((min = 0), (max = 9999999999)),
    balanceca: 0,
  });
  try {
    // Saving the User
    var savedUser = await newUser.save();
    var token = jwt.sign(
      {
        id: savedUser._id,
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
    throw Error("Error while Creating User");
  }
};

exports.updateUser = async function (user) {
  var id = { usuario: user.usuario };

  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }

  //Edit the User Object
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre;
  oldUser.apellido = user.apellido;
  oldUser.email = user.email;
  oldUser.dni = user.dni;
  oldUser.usuariotipo = user.usuariotipo;
  oldUser.usuario = user.usuario;
  oldUser.password = hashedPassword;
  oldUser.tipodni = user.tipodni;
  oldUser.estadocuenta = user.estadocuenta;
  oldUser.empresa = user.empresa;
  oldUser.nacimiento = user.nacimiento;
  oldUser.telefono = user.telefono;
  oldUser.cuit = user.cuit;
  oldUser.calle = user.calle;
  oldUser.altura = user.altura;
  oldUser.ciudad = user.ciudad;
  oldUser.piso = user.piso;
  oldUser.cbu = user.cbu;
  oldUser.cbuCC = user.cbuCC;
  oldUser.nrocuenta = user.nrocuenta;
  oldUser.numerocajacc = user.numerocajacc;
  oldUser.balancecc = user.balancecc;
  oldUser.numerocajaca = user.numerocajaca;
  oldUser.balanceca = user.balanceca;
  oldUser.alias = user.alias;
  oldUser.provincia = user.provincia;
  oldUser.depto = user.depto;

  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

exports.updateUserALIAS = async function (user) {
  var id = { alias: user.alias };

  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }

  //Edit the User Object
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre;
  oldUser.apellido = user.apellido;
  oldUser.email = user.email;
  oldUser.dni = user.dni;
  oldUser.usuariotipo = user.usuariotipo;
  oldUser.usuario = user.usuario;
  oldUser.password = hashedPassword;
  oldUser.tipodni = user.tipodni;
  oldUser.estadocuenta = user.estadocuenta;
  oldUser.empresa = user.empresa;
  oldUser.nacimiento = user.nacimiento;
  oldUser.telefono = user.telefono;
  oldUser.cuit = user.cuit;
  oldUser.calle = user.calle;
  oldUser.altura = user.altura;
  oldUser.ciudad = user.ciudad;
  oldUser.piso = user.piso;
  oldUser.cbu = user.cbu;
  oldUser.cbuCC = user.cbuCC;
  oldUser.nrocuenta = user.nrocuenta;
  oldUser.numerocajacc = user.numerocajacc;
  oldUser.balancecc = user.balancecc;
  oldUser.numerocajaca = user.numerocajaca;
  oldUser.balanceca = user.balanceca;
  oldUser.provincia = user.provincia;
  oldUser.depto = user.depto;
  oldUser.alias = user.alias;

  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

exports.updateUserCBU = async function (user) {
  var id = { cbu: user.cbu };

  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }

  //Edit the User Object
  //var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre;
  oldUser.apellido = user.apellido;
  oldUser.email = user.email;
  oldUser.dni = user.dni;
  oldUser.usuariotipo = user.usuariotipo;
  oldUser.usuario = user.usuario;
  // oldUser.password = hashedPassword;
  oldUser.password = user.password;
  oldUser.tipodni = user.tipodni;
  oldUser.estadocuenta = user.estadocuenta;
  oldUser.empresa = user.empresa;
  oldUser.nacimiento = user.nacimiento;
  oldUser.telefono = user.telefono;
  oldUser.cuit = user.cuit;
  oldUser.calle = user.calle;
  oldUser.altura = user.altura;
  oldUser.ciudad = user.ciudad;
  oldUser.piso = user.piso;
  oldUser.cbu = user.cbu;
  oldUser.cbuCC = user.cbuCC;
  oldUser.nrocuenta = user.nrocuenta;
  oldUser.numerocajacc = user.numerocajacc;
  oldUser.balancecc = user.balancecc;
  oldUser.numerocajaca = user.numerocajaca;
  oldUser.balanceca = user.balanceca;
  oldUser.provincia = user.provincia;
  oldUser.depto = user.depto;
  oldUser.alias = user.alias;

  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
  }
};

// Recupero Usuario por ID
exports.getUsuarioID = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Users = await User.paginate(query, options);
    return Users;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por ID");
  }
};

// Recupero Usuario por CBU
exports.getUsuarioCBU = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Users = await User.paginate(query, options);
    return Users;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por CBU");
  }
};

// Recupero Usuario por Usuario
exports.getUsuarioUsuario = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };

  try {
    var Users = await User.paginate(query, options);
    return Users;
  } catch (e) {
    console.log("error servicio", e);
    throw Error("Error en el paginado de las Usuario por Usuario");
  }
};

exports.deleteUser = async function (id) {
  // Delete the User
  try {
    var deleted = await User.remove({
      _id: id,
    });
    if (deleted.n === 0 && deleted.ok === 1) {
      throw Error("User Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the User");
  }
};

exports.loginUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    var _details = await User.findOne({
      usuario: user.usuario,
    });
    var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) throw Error("Invalid username/password");

    var token = jwt.sign(
      {
        id: _details._id,
      },
      process.env.SECRET,
      {
        expiresIn: 15552000, // expires in 4 mounth
      }
    );
    return { token: token, user: _details };
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Login User");
  }
};

exports.loginUserATM = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    var _details = await User.findOne({
      cuit: user.cuit,
    });
    var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) throw Error("Invalid username/password");

    var token = jwt.sign(
      {
        id: _details._id,
      },
      process.env.SECRET,
      {
        expiresIn: 15552000, // expires in 4 mounth
      }
    );
    return { token: token, user: _details };
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Login User");
  }
};
