const express = require('express');
const userRouter = express.Router();
const { protect, admin } = require('../middlewares/authMiddlewares');
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
} = require('../controllers/userController');

userRouter.route('/login').post(authUser);
userRouter.route('/signup').post(registerUser);

userRouter.use(protect);
userRouter.route('/').get(admin, getAllUsers);
userRouter.route('/profile').get(getUserProfile).patch(updateUserProfile);
module.exports = userRouter;
