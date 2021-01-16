const orderRouter = require('express').Router();
const { protect } = require('../middlewares/authMiddlewares');
const { addOrderItems } = require('../controllers/orderController');

orderRouter.route('/').post(protect, addOrderItems);
module.exports = orderRouter;
