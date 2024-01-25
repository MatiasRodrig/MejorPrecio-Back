const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')


const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    telefono: {
        type: Number,
        required: true
    }
})


// Cifrar password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

// Comprobar password
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
}




module.exports = mongoose.model('User', userSchema)