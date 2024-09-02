"use strict";

// const fs = require("fs");
var express = require("express");

var morgan = require("morgan");

var connectDB = require("./config/db");

require("dotenv").config();

var rateLimit = require("express-rate-limit");

var helmet = require("helmet");

var mongoSanitize = require("express-mongo-sanitize");

var xss = require("xss-clean");

var hpp = require("hpp");

var path = require("path");

var AppError = require("./utils/appError");

var globalErrorHandler = require("./controller/errorController");

process.on("uncaughtException", function (err) {
  console.log(err);
  console.log("UNHANDLER REJECTION! 💥 Shutting down...");
  process.exit(1);
});
var app = express(); // PUG

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // Database connection

connectDB(); //1) GLOBAL MIDDLEWARES
// Set security HTTP headers

app.use(helmet()); // Development loggin

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // Limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour! "
});
app.use("/api", limiter); // Body parser, reading data from the body into req.body

app.use(express.json({
  limit: "10kb"
})); // Data sanitization against NoSQL query injection

app.use(mongoSanitize()); // Data sanitization against XSS

app.use(xss()); // Prevent parameter pollution

app.use(hpp({
  whitelist: ["duration", "ratingsQuantity", "ratingsAverage", "difficulty", "maxGroupSize", "price"]
})); // Serving static files

app.use(express["static"](path.join(__dirname, "public"))); // ROUTES

var tours = require("./route/tour");

var users = require("./route/user");

var reviews = require("./route/review");

var viewRouter = require("./route/viewRoutes");

app.use("/", viewRouter);
app.use("/api/v1/tours", tours);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.all("*", function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!")));
});
app.use(globalErrorHandler);
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  console.log("App running on port:".concat(port, "..."));
});
process.on("unhandledRejection", function (err) {
  console.log(err);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  server.close(function () {
    process.exit(1);
  });
});
//# sourceMappingURL=server.dev.js.map
