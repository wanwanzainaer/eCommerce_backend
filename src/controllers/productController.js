const Product = require('../../models/productModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HttpError('Not Found Product belong the id', 404));
  }
  res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({});
});
