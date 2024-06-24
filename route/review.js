const express = require("express");
const { createReview, getAllReviews } = require("../controller/review");
const { protect, restrictTo } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect,restrictTo('user'), createReview);

module.exports = router;
