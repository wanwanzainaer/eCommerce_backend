module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
