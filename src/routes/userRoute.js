const express = require('express');
const userRouter = express.Router();
const { protect, admin } = require('../middlewares/authMiddlewares');
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require('../controllers/userController');

userRouter.route('/login').post(authUser);
userRouter.route('/signup').post(registerUser);

userRouter.use(protect);

userRouter.route('/profile').get(getUserProfile).patch(updateUserProfile);

userRouter.use(admin);
userRouter.route('/:id').delete(deleteUser).patch(updateUser).get(getUserById);
userRouter.route('/').get(getAllUsers);
module.exports = userRouter;
