const express = require("express");
const {
  getOverview,
  getTour,
} = require("../controller/viewController");

const router = express.Router();

router.route("/").get(getOverview);
// router.route("/tour").get(getTour);
router.route("/tour/:slug").get(getTour);

module.exports = router;
