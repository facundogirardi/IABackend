var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);
 
var ClearingSchema = new mongoose.Schema({
  cbuPropio: {type : String, required: [true, 'campo cbuPropio es requerido']},
  cbuUsuarioO: {type : String, required: [true, 'campo cbuUsuarioO es requerido']},
  cbuUsuarioD: {type : String, required: [true, 'campo cbuUsuarioD es requerido']},
  importe: {type : String, required: [true, 'campo importe es requerido']},
  descripcion: {type : String, required: [true, 'campo descripcion es requerido']},
  pagado: {type : String, required: [true, 'campo pagado es requerido']},
  date: {type : Date}

});
 
ClearingSchema.plugin(mongoosePaginate);
const Clearing = mongoose.model("Clearing", ClearingSchema);

module.exports = Clearing;