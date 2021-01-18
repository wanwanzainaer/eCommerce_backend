const orderRouter = require('express').Router();
const { protect } = require('../middlewares/authMiddlewares');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrder,
} = require('../controllers/orderController');

orderRouter.use(protect);
orderRouter.route('/').post(addOrderItems);
orderRouter.route('/userorder').get(getUserOrder);
orderRouter.route('/:id').get(getOrderById);
orderRouter.route('/:id/pay').put(updateOrderToPaid);
module.exports = orderRouter;
