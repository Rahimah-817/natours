const Tour = require('../../model/tourSchema');

const getAllTours = (req, res) => {
  const tours = Tour.find(req.body.name);
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    tours: tours.length,
    data: tours,
  });
};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = Tour.find((el) => el.id == id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
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
