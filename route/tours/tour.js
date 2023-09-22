const express = require('express');
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
} = require('../../constroller/tours/tour');

const router = express.Router();

router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
