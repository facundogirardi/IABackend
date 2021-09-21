var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var UserSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  tipodni: String,
  dni: String,
  email: String,
  estadocuenta: Number,
  usuario: String,
  password: String,
  usuariotipo: Number,
  empresa: String,
  nacimiento: String,
  telefono: String,
  cuit: String,
  calle: String,
  altura: String,
  ciudad: String,
  piso: String,
  cbu: Number,
  cbuCC: Number,
  nrocuenta: Number,
  numerocajacc: Number,
  balancecc: {
    type: SchemaTypes.Double,
  },
  numerocajaca: Number,
  balanceca: {
    type: SchemaTypes.Double,
  },
  provincia: String,
  depto: String,
  date: Date,
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", UserSchema);

module.exports = User;
