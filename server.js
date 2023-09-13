const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.js`)
// );

const tours = require('./route/tours/tour');
const users = require('./route/users/user');
const { config } = require('dotenv');
app.use('/api/v1/tours', tours);
app.use('/api/v1/users', users);

console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port:${port}...`);
});
