const express = require('express');
const userSchema = require('../models/user')
const router = express.Router();

// Create user

router.post('/users', async (req, res) => {
    const user = new userSchema(req.body);
    try {
        const data = await user.save();
        res.status(201).json({ data: data, msg: 'Se ha creado un usuario' })
    } catch (error) {
        res.status(301);
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
router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, password, telefono  } = req.body
    userSchema.updateOne({ _id: id }, { $set: { nombre, apellido, email, password, telefono } }).then((data) => res.json(data)).catch((error) => res.status(300))
});

// Delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(400));
});

    
    

module.exports = router;