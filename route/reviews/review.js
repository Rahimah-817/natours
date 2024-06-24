const express = require("express");
const {
  createReview,
  getAllReviews,
} = require("../../constroller/reviews/review");
const auth = require("../../constroller/auth/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  //   .post(auth.protect, auth.restrictTo("user"), createReview)
  .post(auth.protect, createReview)
  .get(getAllReviews);

module.exports = router;
