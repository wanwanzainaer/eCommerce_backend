const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

exports.protect = async (req, res, next) => {
  console.log(req.headers.authorization);
  next();
};
