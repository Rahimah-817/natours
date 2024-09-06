const express = require("express");
const { getOverview, getTour, getLoginForm } = require("../controller/viewController");

const router = express.Router();

router.route("/").get(getOverview);
// router.route("/tour").get(getTour);
router.route("/tour/:slug").get(getTour);

//  /login
router.route('/login').get(getLoginForm)

module.exports = router;
