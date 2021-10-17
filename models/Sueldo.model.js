var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var SueldoSchema = new mongoose.Schema({
  cbu: String,
  cbuEmpresa: String,
  importe: String,
  descripcion: String,
  fechaPago: String,
  pagado : String, 
  date: Date,
});

SueldoSchema.plugin(mongoosePaginate);
const Sueldo = mongoose.model("Sueldo", SueldoSchema);

module.exports = Sueldo;