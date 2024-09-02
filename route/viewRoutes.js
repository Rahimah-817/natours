const express = require("express");
const {
  getBase,
  getOverview,
  getTour,
} = require("../controller/viewController");

const router = express.Router();

router.route("/").get(getBase);
router.route("/overview").get(getOverview);
router.route("/tour").get(getTour);

module.exports = router;
