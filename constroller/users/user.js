const User = require("../../model/userSchema");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsesrs = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

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
  const userId = req.params.id;
  const newUser = Object.assign({ id: userId }, req.body);

  users.push(newUser);
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(201).json({
        status: "success",
        data: newUser,
      });
    }),
  );
};

const getUser = (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);

  res.status(200).json({
    status: "success",
    data: user,
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userId);
  users[userIndex] = req.body;
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(200).json({
        status: "success",
        data: users[userIndex],
      });
    }),
  );
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userId);
  users.splice(userIndex, 1);
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(200).json({
        status: "success",
        data: null,
      });
    }),
  );
};

module.exports = {
  getAllUsesrs,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
