var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    usuario: String,
    password: String,
    usuariotipo: String,
    date: Date 
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;