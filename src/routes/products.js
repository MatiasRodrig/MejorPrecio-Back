const express = require('express');
const productSchema = require('../models/products')
const router = express.Router();

// Create product

router.post('/products', (req, res) => {
    const product = productsSchema(req.body)
    product.save().then((data) => res.json(data, 'Se ha creado un producto')).catch((err) => res.json({err}))
})


// Get all products

router.get('/products', (req, res) => {
    productsSchema.find().then((data) => res.json(data)).catch((err) => res.json({err}))
})

// Get a specific product by ID

router.get('/producto:id', (req, res) => {
    const id = req.params.id
    productSchema.findById(id).then((data) => res.json(data)).catch((err) => res.json(err))
})

// Update product

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio, mercado, comentario } = req.body
    productSchema.updateOne({_id: id}, {$set: {nombre, precio, mercado, comentario}}).then((data) => res.json(data)).catch((err) => res.json({err}))
})

// Delete product

router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    productSchema.deleteOne({ _id: id }).then((data) => res.json(data)).catch((err) => res.status(400).json(`Error al eliminar el producto ${err}`))
})

module.exports = router;