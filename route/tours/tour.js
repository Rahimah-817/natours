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
} = require("../../constroller/tours/tour");
const {
  protect,
  restrictTo,
} = require("../../constroller/auth/authController");

const router = express.Router();

router.route("/").post(createTour).get(protect, getAllTours);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);
router.route("/top-5-cheap").get(aliesTopTours, getAllTours);
router.route("/tour-stats").get(getTourState);
router.route("/monthly-plan/:year").get(getMonthlyPlan);

module.exports = router;
