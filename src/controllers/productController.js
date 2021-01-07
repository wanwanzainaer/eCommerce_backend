const Product = require('../../models/productModel');
const asyncHandler = require('express-async-handler');
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error('Not Found Product belong the id'));
  }
  res.json(product);
});
