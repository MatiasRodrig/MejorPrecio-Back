const express = require('express');
const userSchema = require('../models/user')
const router = express.Router();
const passwordValidator = require('password-validator');
const { passwordSchema, errors } = require('../settings/passwords')


// Create user
router.post('/users', async (req, res) => {
    const { password } = req.body;
    const passwordErrors = passwordSchema.validate(password, { list: true });
    if (passwordErrors.length === 0) {
        const user = new userSchema(req.body);
        try {
            const data = await user.save();
            res.status(201).json({ data: data, msg: 'Se ha creado un usuario' })
        } catch (error) {
            res.status(301);
        }
    } else {
        const errorMessages = passwordErrors.map((error) => errors[error]);
        res.status(400).send({ message: 'La contraseña no cumple con los requisitos', errors: errorMessages });
    }
});

// Get all users
router.get("/users", (req, res) => {
    userSchema.find().then((data) => res.json(data)).catch((error) => res.status(300))
})


//Get a specific user by ID

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ error }))
})

// Update user
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, password, telefono } = req.body
    const passwordErrors = passwordSchema.validate(password, { list: true });
    if (passwordErrors.length === 0) {
        const user = await userSchema.findById(id);
        if (user) {
            user.nombre = nombre;
            user.apellido = apellido;
            user.email = email;
            user.password = user.encryptPassword(password);
            user.telefono = telefono;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } else {
        const errorMessages = passwordErrors.map((error) => errors[error]);
        res.status(400).send({ message: 'La contraseña no cumple con los requisitos', errors: errorMessages });
    }
});


// Delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(400));
});




module.exports = router;