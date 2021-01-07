const express = require('express');
const productRouter = require('./routes/productRoute');
const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

module.exports = app;
