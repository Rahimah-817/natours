const express = require('express')
const {creatTour, getAllTours, getTour} = require('../../constroller/tours/getTours')


const router = express.Router()

// router.post('/', creatTour)
router.get('/', getAllTours)
router.get('/:id', getTour)

module.exports = router