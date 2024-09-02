// const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNHANDLER REJECTION! 💥 Shutting down...");
  process.exit(1);
});

const app = express();

// PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Database connection
connectDB();

//1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development loggin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour! ",
});
app.use("/api", limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "difficulty",
      "maxGroupSize",
      "price",
    ],
  }),
);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
const tours = require("./route/tour");
const users = require("./route/user");
const reviews = require("./route/review");
const viewRouter = require("./route/viewRoutes");

app.use("/", viewRouter);
app.use("/api/v1/tours", tours);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

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
    process.exit(1);
  });
});
