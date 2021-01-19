const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const { admin, protect } = require('../middlewares/authMiddlewares');
productRouter.route('/').get(productController.getAllProducts);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(protect, admin, productController.deleteProduct);

module.exports = productRouter;
