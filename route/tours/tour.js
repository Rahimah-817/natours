const express = require('express');
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliesTopTours,
  getTourState,
} = require('../../constroller/tours/tour');

const router = express.Router();

router.route('/top-5-cheap').get(aliesTopTours, getAllTours);
router.route('/tour-stats').get(getTourState);
router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
