const User = require("../../model/userSchema");
const catchAsync = require('../../utils/catchAsync')

const signup = catchAsync( async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: newUser,
    message: "User created successfully!",
  });
});

module.exports = signup;