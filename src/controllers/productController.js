const Product = require('../../models/productModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');
exports.getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = +req.query.pageNumber;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  // const product await Product.create({...req.body});
  const product = await Product.findById(req.params.id);

  if (!product) return next(new HttpError('Can not find the product', 404));
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed)
    return next(new HttpError('Product already review', 404));

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  console.log(review);

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  console.log(product.rating);

  const updateReview = await product.save();
  res.status(201).json({ message: 'Reiew added' });
});

exports.getTopProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
