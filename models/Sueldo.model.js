var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);
 
var SueldoSchema = new mongoose.Schema({
  cbu: {type : String, required: [true, 'campo CBU es requerido']},
  codigo: {type : String, required: [true, 'campo CODIGO es requerido']},
  cbuEmpresa: {type : String, required: [true, 'campo CBUEMPRESA es requerido']},
  importe: {type : String, required: [true, 'campo IMPORTE es requerido']},
  descripcion: {type : String, required: [true, 'campo DESCRIPCION es requerido']},
  fechaPago: {type : String, required: [true, 'campo FECHAPAGO es requerido']},
  pagado: {type : String, required: [true, 'campo PAGADO es requerido']},
  date: {type : Date}
  
});
 
SueldoSchema.plugin(mongoosePaginate);
const Sueldo = mongoose.model("Sueldo", SueldoSchema);

module.exports = Sueldo;