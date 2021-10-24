var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var MantenimientoSchema = new mongoose.Schema({
  clave: {type : String, required: [true, 'campo CLAVE es requerido']},
  mantenimientoF: {type : String, required: [true, 'campo MANTENIMIENTOF es requerido']},
  interes: {type : String, required: [true, 'campo INTERES es requerido']},
  descubiertoF: {type : String, required: [true, 'campo DESCUBIERTOF es requerido']},
  mantenimientoJ: {type : String, required: [true, 'campo MANTENIMIENTOJ es requerido']},
  descubiertoJ: {type : String, required: [true, 'campo DESCUBIERTOJ es requerido']},
  date: Date,
});

MantenimientoSchema.plugin(mongoosePaginate);
const Mantenimiento = mongoose.model("Mantenimiento", MantenimientoSchema);

module.exports = Mantenimiento;
