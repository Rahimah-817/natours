const express = require("express");
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliesTopTours,
  getTourState,
  getMonthlyPlan,
} = require("../controller/tour");
const { protect, restrictTo } = require("../controller/authController");

const reviewRouter = require("./review");

const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin", "lead-guide"), createTour)
  .get(getAllTours);
router
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);
router.route("/top-5-cheap").get(aliesTopTours, getAllTours);
router.route("/tour-stats").get(getTourState);
router.route("/monthly-plan/:year").get(protect, restrictTo("admin", "lead-guide", 'guide'),getMonthlyPlan);

router.use("/:tourId/reviews", reviewRouter);

module.exports = router;
