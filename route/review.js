const express = require("express");
const {
  createReview,
  getAllReviews,
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
router.route("/:id").delete(deleteReview).patch(updateReview);

module.exports = router;
