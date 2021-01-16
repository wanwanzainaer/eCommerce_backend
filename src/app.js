const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');

const errorController = require('./controllers/errorController');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use(errorController);
module.exports = app;
