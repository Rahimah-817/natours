const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require("../../constroller/auth/authController");

const {
  getAllUsesrs,
  updateMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../constroller/users/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);

router.route("/").get(getAllUsesrs).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
