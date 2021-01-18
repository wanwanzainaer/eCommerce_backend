const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const HttpError = require('../utils/HttpError');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (err) {
      return next(new HttpError("You don't have the authorization", 401));
    }
  }

  if (!token)
    return next(new HttpError("You don't have the authorization", 401));

  next();
});

exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new HttpError('Not authorized as an admin', 401));
  }
};
