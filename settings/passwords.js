const passwordValidator = require('password-validator');

// Crear un esquema
const passwordSchema = new passwordValidator();

// Añadir propiedades al esquema
passwordSchema
    .is().min(8)                                    // Longitud mínima 8
    .is().max(100)                                  // Longitud máxima 100
    .has().uppercase()                              // Debe tener mayúsculas
    .has().lowercase()                              // Debe tener minúsculas
    .has().digits(1)                                // Debe tener al menos 1 dígitos
    .has().not().spaces()                           // No debe tener espacios
    .is().not().oneOf(['Passw0rd', 'Password123']); // Lista negra de contraseñas

const errors = {
    min: 'La contraseña debe tener al menos 8 caracteres',
    max: 'La contraseña no debe tener más de 100 caracteres',
    uppercase: 'La contraseña debe contener al menos una letra mayúscula',
    lowercase: 'La contraseña debe contener al menos una letra minúscula',
    digits: 'La contraseña debe contener al menos 1 dígitos',
    spaces: 'La contraseña no debe contener espacios',
    oneOf: 'La contraseña no puede ser "Passw0rd" o "Password123"'
};


module.exports = passwordSchema, errors