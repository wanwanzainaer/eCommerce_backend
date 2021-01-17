const orderRouter = require('express').Router();
const { protect } = require('../middlewares/authMiddlewares');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require('../controllers/orderController');

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/id:/pay').put(protect, updateOrderToPaid);
module.exports = orderRouter;
