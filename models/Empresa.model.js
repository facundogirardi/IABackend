var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var EmpresaSchema = new mongoose.Schema({
  nombre: {type : String, required: [true, 'campo NOMBRE es requerido']},
  codigopago: {type : String, required: [true, 'campo CODIGOPAGO es requerido']},
  importe: { type: SchemaTypes.Double, required: [true, 'campo IMPORTE es requerido']},
  descripcion: {type : String, required: [true, 'campo DESCRIPCION es requerido']},
  fechaVencimiento: {type : String, required: [true, 'campo FECHAVENCIMIENTO es requerido']},
  estado: {type : String, required: [true, 'campo ESTADO es requerido']},
  cuitEmpresa: {type : String, required: [true, 'campo CUITEMPRESA es requerido']},
  debito: {type : String, required: [true, 'campo DEBITO es requerido']},
  cuit: {type : String, required: [true, 'campo CUIT es requerido']},
  date: Date,
});

EmpresaSchema.plugin(mongoosePaginate);
const Empresa = mongoose.model("Empresa", EmpresaSchema);

module.exports = Empresa;
