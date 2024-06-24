const Tour = require("../model/tourSchema");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/appFeatures");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const aliesTopTours = async (req, res, next) => {
  req.query.limit = "6";
  req.query.sort = "ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};

const getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

const getTour = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  const tour = await Tour.findById(tourId).populate("review");
  if (!tour) {
    return next(new AppError("No tour found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    tour,
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  if (!tourId) {
    return next(new AppError("No tour found with that id", 404));
  }
  const tour = await Tour.findByIdAndUpdate(tourId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: tour,
  });
});

const deleteTour = factory.deleteOne(Tour)

// const deleteTour = catchAsync(async (req, res, next) => {
//   const tourId = req.params.id;
//   if (!tourId) {
//     return next(new AppError("No tour found with that id", 404));
//   }
//   await Tour.findByIdAndDelete(tourId);
//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });

const getTourState = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingQuantity" },
        avgRating: { $avg: "$ratingAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    {
      $match: { _id: { $ne: "EASY" } }, // Use string representation of _id field
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    { $unwind: "$startDates" },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: "$startDates",
        },
        numTourStarts: { $sum: 1 },
        tour: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "success",
    index: plan.length,
    data: {
      plan,
    },
  });
});

module.exports = {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliesTopTours,
  getTourState,
  getMonthlyPlan,
};
