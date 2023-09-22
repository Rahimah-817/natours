const express = require('express');
const createTour = require('../../constroller/tours/tourController');

const router = express.Router();

router.post('/', createTour);

module.exports = router;
