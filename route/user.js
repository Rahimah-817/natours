const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controller/authController");

const {
  getAllUsesrs,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
} = require("../controller/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect)

router.patch("/updateMyPassword", updatePassword);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);
router.get("/me", getMe, getUser) ;

router.use(restrictTo('admin'));
router.route("/").get(getAllUsesrs).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
