const { default: mongoose } = require('mongoose')

const productSchema = mongoose.Schema({
    venta: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    colonia: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true
    },
    comentario: {
        type: String
    }
})

module.exports = mongoose.model('Products', productSchema)