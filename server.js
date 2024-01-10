const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./constroller/error/errorController");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNHANDLER REJECTION! 💥 Shutting down...");
  process.exist(1);
});

const app = express();

// Database connection
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const tours = require("./route/tours/tour");
const users = require("./route/users/user");
app.use("/api/v1/tours", tours);
app.use("/api/v1/users", users);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port:${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  server.close(() => {
    process.exist(1);
  });
});
