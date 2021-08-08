// Gettign the Newly created Mongoose Model we just created
var User = require("../models/User.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

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
    console.log("Query", query);
    var Users = await User.paginate(query, options);
    // Return the Userd list that was retured by the mongoose promise
    return Users;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Users");
  }
};

// Recupero Usuario por ID
exports.getUsuarioID = async function (query, page, limit) {
  var options = {
      page,
      limit
  }

  try {
      var Users = await User.paginate(query, options)
      return Users;

  } catch (e) {
      console.log("error servicio", e)
      throw Error('Error en el paginado de las Usuario por ID');
  }
}

exports.createUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  var hashedPassword = bcrypt.hashSync(user.password, 8);

  var newUser = new User({
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    date: new Date(),
    usuario: user.usuario,
    usuariotipo: user.usuariotipo,
    password: hashedPassword,
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
  console.log("ID : ", id);

  try {
    //Find the old User Object by the Id
    var oldUser = await User.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the User");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    console.log("viejo :", oldUser);
    return false;
  }
  //Edit the User Object
  var hashedPassword = bcrypt.hashSync(user.password, 8);
  oldUser.nombre = user.nombre;
  oldUser.apellido = user.apellido;
  oldUser.email = user.email;
  oldUser.usuariotipo = user.usuariotipo;
  oldUser.usuario = user.usuario;
  oldUser.password = hashedPassword;

  try {
    var savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User");
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
    console.log("ID ", id);
    throw Error("Error Occured while Deleting the User");
  }
};

exports.loginUser = async function (user) {
  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    console.log("login:", user);
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
