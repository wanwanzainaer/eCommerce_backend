const express = require('express');
const userRouter = express.Router();
const { protect } = require('../middlewares/authMiddlewares');
const { authUser, getUserProfile } = require('../controllers/userController');
userRouter.route('/login').post(authUser);
userRouter.route('/profile').get(protect, getUserProfile);

module.exports = userRouter;
