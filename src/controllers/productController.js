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

exports.createProduct = asyncHandler(async (req, res, next) => {
  // const product await Product.create({...req.body});
  const product = await Product.create({
    name: 'Smaple name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  res.status(201).json(product);
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  // const product await Product.create({...req.body});
  const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  if (!updateProduct)
    return next(new HttpError('Can not find the product', 404));

  res.status(201).json(updateProduct);
});
