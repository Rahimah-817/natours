const express = require("express");
const {
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controller/review");
const { protect, restrictTo } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("admin", "lead-guide"), createReview);
router.route("/:id").delete(deleteReview);

module.exports = router;
