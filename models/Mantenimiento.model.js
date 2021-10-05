var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var MantenimientoSchema = new mongoose.Schema({
  clave: String,
  mantenimientoF: String,
  interes: String,
  descubiertoF: String,
  mantenimientoJ: String,
  descubiertoJ: String,
  date: Date,
});

MantenimientoSchema.plugin(mongoosePaginate);
const Mantenimiento = mongoose.model("Mantenimiento", MantenimientoSchema);

module.exports = Mantenimiento;
