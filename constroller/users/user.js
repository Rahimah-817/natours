const User = require("../../model/userSchema");
const catchAsync = require("../../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  Object.keys(obj).forEach((el) => {
    const newObj = {};
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
  // filterd the unwanted field
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
  res.status(200).json({
    status: "success",
    data: users.find((user) => user.id === userId),
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
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
