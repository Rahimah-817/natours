const express = require('express');
const tourController = require('../../constroller/tours/tour');

const router = express.Router();

// router.param('id', tourController);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router.post('/', tourController.checkBody, tourController.creatTour);
router.get('/', tourController.getAllTours);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
