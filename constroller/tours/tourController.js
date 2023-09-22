const mongoose = require('mongoose');
const Tour = require('../../model/tourSchema');

const createTour = async (req, res) => {
  const { name, price, rating } = req.body;
  try {
    const tour = await Tour.create({ name, price, rating });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTour;
