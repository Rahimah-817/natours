const express = require('express');
const {
  creatTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
} = require('../../constroller/tours/tour');

const router = express.Router();

router.post('/', creatTour);
router.get('/', getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
