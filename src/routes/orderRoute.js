const orderRouter = require('express').Router();
const { protect, admin } = require('../middlewares/authMiddlewares');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrder,
  getAllOrders,
  updateOrderToDelivered,
} = require('../controllers/orderController');

orderRouter.use(protect);
orderRouter.route('/').post(addOrderItems).get(admin, getAllOrders);
orderRouter.route('/userorder').get(getUserOrder);
orderRouter.route('/:id').get(getOrderById);
orderRouter.route('/:id/pay').put(updateOrderToPaid);
orderRouter.route('/:id/deliver').put(admin, updateOrderToDelivered);

module.exports = orderRouter;
