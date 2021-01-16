const orderRouter = require('express').Router();
const { protect } = require('../middlewares/authMiddlewares');
const {
  addOrderItems,
  getOrderById,
} = require('../controllers/orderController');

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
module.exports = orderRouter;
