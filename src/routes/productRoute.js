const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
productRouter.route('/').get(productController.getAllProducts);

productRouter.route('/:id').get(productController.getProduct);

module.exports = productRouter;
