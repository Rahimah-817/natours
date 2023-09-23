const Tour = require('../../model/tourSchema');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      tours: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

const getTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    const tour = await Tour.findById(tourId);
    // const tour = await Tour.findOne({_id: tourId});
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = Tour.find((el) => el.id == id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = Tour.find((el) => el.id == id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour with this id not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
};
