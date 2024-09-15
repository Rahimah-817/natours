const express = require("express");
const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  updateUserData,
} = require("../controller/viewController");
const { isLoggedIn, protect } = require("../controller/authController");

const router = express.Router();


router.get("/", isLoggedIn, getOverview);

router.get("/tour/:slug", isLoggedIn, getTour);
//  /login
router.get("/login", isLoggedIn, getLoginForm);
router.get("/signup", getSignupForm)
router.get("/me", protect, getAccount);
router.get("//submit-user-data", updateUserData);
module.exports = router;
