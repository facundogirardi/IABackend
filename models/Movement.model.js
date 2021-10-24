var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MovementSchema = new mongoose.Schema({
    tipomovimiento: {type : String, required: [true, 'campo TIPOMOVIMIENTO es requerido']},
    importe: {type : String, required: [true, 'campo IMPORTE es requerido']},
    importeCC: {type : String, required: [true, 'campo IMPORTECC es requerido']},
    importeCA: {type : String, required: [true, 'campo IMPORTECA es requerido']},
    usuario : {type : String, required: [true, 'campo USUARIO es requerido']},
    date: Date 

 

})

MovementSchema.plugin(mongoosePaginate)
const Movement = mongoose.model('Movement', MovementSchema)

module.exports = Movement;