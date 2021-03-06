var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);
 
var ComercioSchema = new mongoose.Schema({
  cuit: {type : String, required: [true, 'campo CUIT es requerido']},
  codigotransaccion: {type : String, required: [true, 'campo CODIGOTRANSACCION es requerido']},
  cuitEmpresa: {type : String, required: [true, 'campo CUITEMPRESA es requerido']},
  importe: {type : String, required: [true, 'campo IMPORTE es requerido']},
  descripcion: {type : String, required: [true, 'campo DESCRIPCION es requerido']},
  fechaPago: {type : String, required: [true, 'campo FECHAPAGO es requerido']},
  pagado: {type : String, required: [true, 'campo PAGADO es requerido']},
  date: {type : Date}
  
});
 
ComercioSchema.plugin(mongoosePaginate);
const Comercio = mongoose.model("Comercio", ComercioSchema);

module.exports = Comercio;