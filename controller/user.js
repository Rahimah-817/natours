const User = require("../model/userSchema");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


const updateMe = catchAsync(async (req, res, next) => {
  // Create Error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password update. Please use /updateMyPassword.",
        404,
      ),
    );
  }

  // Filter the unwanted fields
  const filteredBody = filterObj(req.body, "name", "email");

  // Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    updateUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: "success", data: null });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

const getAllUsesrs = factory.getAll(User);
const getUser = factory.getOne(User);
// DON'T update the password with this
const updateUser = factory.updateOne(User);
const deleteUser = factory.deleteOne(User);

module.exports = {
  getAllUsesrs,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
