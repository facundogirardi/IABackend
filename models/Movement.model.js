var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MovementSchema = new mongoose.Schema({
    tipomovimiento: String,
    importe: Number,
    usuario : String,
    date: Date 

 

})

MovementSchema.plugin(mongoosePaginate)
const Movement = mongoose.model('Movement', MovementSchema)

module.exports = Movement;