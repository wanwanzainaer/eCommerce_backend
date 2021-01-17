const Order = require('../../models/OrderModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');
const orderRouter = require('../routes/orderRoute');

exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0)
    return next(new HttpError('No order items', 400));

  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json(order);
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) return next(new HttpError('You order not found', 404));

  res.status(200).json(order);
});

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    },
  });

  if (!order) return next(new HttpError('You order not found', 404));

  res.status(200).json(order);
});
