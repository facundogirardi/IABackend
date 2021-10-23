var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var EmpresaSchema = new mongoose.Schema({
  nombre: String,
  codigopago: String,
  importe: {
    type: SchemaTypes.Double,
  },
  descripcion: String,
  fechaVencimiento: String,
  estado: String,
  cuitEmpresa: String,
  debito: String,
  cuit: String,
  date: Date,
});

EmpresaSchema.plugin(mongoosePaginate);
const Empresa = mongoose.model("Empresa", EmpresaSchema);

module.exports = Empresa;
