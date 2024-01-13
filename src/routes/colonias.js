const express = require('express');
const coloniasSchema = require('../models/colonias')
const router = express.Router();

// Create venta

router.post('/colonias', (req, res, next) => {
    const colonia = coloniasSchema(req.body)
    colonia.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.error(err);
            if (!res.headersSent) {
                next(err);
            }
        })
})

// Get all ventas

router.get('/colonias', (req, res, next) => {
    coloniasSchema.find().then((data) => res.status(200).json(data)).catch((err) => next(err))
})


// Get a specific venta by ID

router.get('/colonias:id', (req, res, next) => {
    const id = req.params.id
    coloniasSchema.findById(id).then((data) => res.status(200).json(data)).catch((err) => next(err))
})

// Update venta

router.put('/colonias/:id', (req, res, next) => {
    const id = req.params.id;
    const { nombre, precio, mercado, comentario } = req.body
    coloniasSchema.updateOne({ _id: id }, { $set: { nombre, precio, mercado, comentario } }).then((data) => res.status(200).json(data)).catch((err) => next(err))
})

// Delete venta

router.delete('/colonias/:id', (req, res, next) => {
    const { id } = req.params;
    coloniasSchema.deleteOne({ _id: id }).then((data) => res.status(200).json(data)).catch((err) => next(err))
})

module.exports = router;