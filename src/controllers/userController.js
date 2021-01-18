const User = require('../../models/userModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');
const generateToken = require('../utils/generateToken');
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new HttpError('Can not find user by the email', 401));
  if (!(await user.matchPassword(password)))
    return next(new HttpError('Incorrect Password', 401));

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new HttpError('User not found', 404));

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('here');
  const userExists = await User.findOne({ email });
  if (userExists) return next(new HttpError('User already exists', 400));

  console.log('before create user');
  const user = await User.create({
    name,
    email,
    password,
  });
  console.log('after create user');

  console.log(user);
  if (!user) {
    return next(new HttpError('Something Error', 500));
  }
  console.log('here');

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  // const user = await User.findByIdAndUpdate(req.user._id, { ...req.body });

  const user = await User.findById(req.user._id);
  if (!user) return next(new HttpError('User not found', 404));
  user.name = req.body.name || user.anme;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});
