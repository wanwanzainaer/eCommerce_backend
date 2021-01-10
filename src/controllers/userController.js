const User = require('../../models/userModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');
const generateToken = require('../utils/generateToken');
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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
  // const user = await User.findById(req.user._id);

  res.send('here');
});
