const express = require("express");
const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
} = require("../controller/viewController");

const router = express.Router();

router.route("/").get(getOverview);
// router.route("/tour").get(getTour);
router.route("/tour/:slug").get(getTour);

//  /login
router.route("/login").get(getLoginForm);
router.route("/signup").get(getSignupForm);

module.exports = router;
