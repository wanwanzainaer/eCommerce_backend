const products = require('../../data/products');

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProduct = (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  if (!product) return res.status(404).json({});
  res.json(product);
};
