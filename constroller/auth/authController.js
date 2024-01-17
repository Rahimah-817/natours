const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../../model/userSchema");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    data: newUser,
    message: "User created successfully!",
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  const token = signToken(user._id);

  res.json({
    message: "Success",
    data: user,
    token,
  });
});

const protect = catchAsync(async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  // Varification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return new AppError(
      "The user belonging to this token does no longer exist.",
      401,
    );
  }

  // Check if user chanch password after token was issued
  currentUser.changedPasswordAfter(decoded.iat);

  // req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles: ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403),
      );
    }

    next();
  };
};

module.exports = { signup, login, protect, restrictTo };
