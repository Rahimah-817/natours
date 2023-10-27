const express = require('express');
const tourController = require('../../constroller/tours/tour');

const router = express.Router();

router
  .route('/')
  .post(tourController.createTour)
  .get(tourController.getAllTours);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
router
  .route('/top-5-cheap')
  .get(tourController.aliesTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourState);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

module.exports = router;
