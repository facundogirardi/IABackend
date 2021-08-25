var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    tipodni: String,
    dni: String,
    email: String,
    estadocuenta: Number,
    usuario: String,
    password: String,
    usuariotipo: Number,
    empresa: String,
    nacimiento: String,
    telefono: String,
    cuit: String,
    calle: String,
    altura: String,
    ciudad: String,
    piso: String,
    cbu: String,
    alias: String,
    nrocuenta: Number,
    numerocajacc : Number,
    balancecc : Number,
    numerocajaca : Number,
    balanceca : Number,
    numerocajadls : Number,
    balancedls : Number,
    flagdolar : Number,
    numerocajaeu : Number,
    balanceeu : Number,
    flageuro : Number,
    provincia : String,
    pais : String,
    depto : String,
    date: Date 

 

})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;