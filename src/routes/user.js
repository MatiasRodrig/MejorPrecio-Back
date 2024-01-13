const express = require('express');
const userSchema = require('../models/user')
const router = express.Router();

// Create user

router.post('/users', (req, res) => {
    const user = userSchema(req.body)
    user
        .save().then((data) => res.json(data, 'Se ha creado un usuario')).catch((error) => res.json({ error }))
});

// Get all users
router.get("/users", (req, res) => {
    userSchema.find().then((data) => res.json(data)).catch((error) => res.json({ error }))
})


//Get a specific user by ID

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ error }))
})

// Update user
router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, password, telefono  } = req.body
    userSchema.updateOne({ _id: id }, { $set: { nombre, apellido, email, password, telefono } }).then((data) => res.json(data)).catch((error) => res.json({ error }))
});

// Delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json(`Error al eliminar el usuario ${error}`));
});

    
    

module.exports = router;