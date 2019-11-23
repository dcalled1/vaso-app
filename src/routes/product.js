const router = require('express').Router();
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

router.get('/products/new', (req, res) => {
    res.render('products/new');
});

router.post('/products/new/check', (req, res) => {
    let {name, description, price} = req.body;

    let product = new Product({
        name, price, description
    });
    product.save()
    .then(() => {
        req.flash('success_msg', 'Producto añadido exitosamente');
        res.redirect('/products/new')
    })
    .catch(err => {
        console.error(err);
        req.flash('error_msg', 'Ocurrió un error inesperado');
        res.redirect('/products/new')
    });

});

router.get('/products', (req, res) => {
    res.redirect('/products/all');
});

router.get('/products/all', async (req, res) => {
    let products = await Product.find();
    res.render('products/all', {products})
});


router.post('/products/comment/new', async (req, res) => {
    let {product, title, description} = req.body;
    products = []

    for (let p of product) {
        products.push(mongoose.Types.ObjectId(p));
    }
    let author = mongoose.Types.ObjectId(req.user.id);
    let comm = new Comment({
        title, description, author, products
    });

    await comm.save()
    .then(() => {
        req.flash('success_msg', 'Tu comentario ha sido enviado exitosamente.');
        res.redirect('/products')
    })
    .catch(err => {
        console.error(err);
        req.flash('error_msg', 'Ocurrió un error inesperado');
        res.redirect('/products')
    });

});


module.exports = router;