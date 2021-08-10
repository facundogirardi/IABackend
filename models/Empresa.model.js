var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EmpresaSchema = new mongoose.Schema({
    nombre: String,
    codigopago : String,
    importe : Number,
    mes : Number,
    fechaVencimiento : Number,
    estado : String,
    cuit : String,
    date : Date 

})

EmpresaSchema.plugin(mongoosePaginate)
const Empresa = mongoose.model('Empresa', EmpresaSchema)

module.exports = Empresa;