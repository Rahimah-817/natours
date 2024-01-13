const express = require("express");
const signup = require("../../constroller/auth/authController");

const {
  getAllUsesrs,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../constroller/users/user");

const router = express.Router();

router.post("/signup", signup);

router.route("/").get(getAllUsesrs).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
