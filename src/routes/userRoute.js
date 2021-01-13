const express = require('express');
const userRouter = express.Router();
const { protect } = require('../middlewares/authMiddlewares');
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require('../controllers/userController');

userRouter.route('/login').post(authUser);
userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);
userRouter.route('/signup').post(registerUser);
module.exports = userRouter;
