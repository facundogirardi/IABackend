var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);
 
var ClearingSchema = new mongoose.Schema({
  cuitPropio: {type : String, required: [true, 'campo cuitPropio es requerido']},
  cuitUsuarioO: {type : String, required: [true, 'campo cuitUsuarioO es requerido']},
  cuitUsuarioD: {type : String, required: [true, 'campo cuitUsuarioD es requerido']},
  importe: {type : String, required: [true, 'campo importe es requerido']},
  descripcion: {type : String, required: [true, 'campo descripcion es requerido']},
  date: {type : Date}

});
 
ClearingSchema.plugin(mongoosePaginate);
const Clearing = mongoose.model("Clearing", ClearingSchema);

module.exports = Clearing;