const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_DATABASE);

    console.log(`MongoDB Connected successfully!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.js`)
// );

const tours = require('./route/tours/tour');
const tourRoute = require('./route/tours/tourRoute');
const users = require('./route/users/user');
app.use('/api/v1/tours', tours);
app.use('/api/v1/tours/create', tourRoute);
app.use('/api/v1/users', users);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port:${port}...`);
});
