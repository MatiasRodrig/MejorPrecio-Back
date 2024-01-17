const passwordValidator = require('password-validator');

// Crear un esquema
const passwordSchema = new passwordValidator();

// Añadir propiedades al esquema
passwordSchema
    .is().min(8)                                    // Longitud mínima 8
    .is().max(100)                                  // Longitud máxima 100
    .has().uppercase()                              // Debe tener mayúsculas
    .has().lowercase()                              // Debe tener minúsculas
    .has().digits(2)                                // Debe tener al menos 2 dígitos
    .has().not().spaces()                           // No debe tener espacios
    .is().not().oneOf(['Passw0rd', 'Password123']); // Lista negra de contraseñas


module.exports = passwordSchema