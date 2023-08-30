const fs = require('fs');
const express = require('express');
const morgan = require('morgan')

const app = express();
app.use(express.json());

app.use(express.json());
app.use(morgan('dev'))

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

const router = require('./route/tours/tour');
app.use('/api/v1/tours', router);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port:${port}...`);
});
