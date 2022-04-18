const express = require('express');
const router = express.Router();
const Product = require('../app/models/Product');

const productController = require('../app/controllers/ProductController');


router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.delete);
router.delete('/:id/deletereal', productController.deleteReal);
router.get('/:slug', productController.show);



module.exports = router;