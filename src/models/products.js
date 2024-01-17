const { default: mongoose } = require('mongoose')

const productSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    mercado: {
        type: String,
        require: true
    },
    comentario: {
        type: String
    }
})

module.exports = mongoose.model('Products', productSchema)