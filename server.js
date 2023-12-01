const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Database connection
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.js`)
// );

const tours = require("./route/tours/tour");
const users = require("./route/users/user");
app.use("/api/v1/tours", tours);
app.use("/api/v1/users", users);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port:${port}...`);
});
