const express = require("express");
const {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
  setTourAndUserIds,
} = require("../controller/review");
const { protect, restrictTo } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), setTourAndUserIds, createReview);
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
