const Tour = require("../../model/tourSchema");
const APIFeatures = require("../../utils/appFeatures");
const catchAsync = require("../../utils/catchAsync");

const aliesTopTours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};

const getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: "success",
    tours: tours.length,
    data: tours,
  });
});

const createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  res.status(200).json({
    status: "success",
    data: tour,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  console.log(req.query);
  const tour = await Tour.findById(tourId);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "tour not found",
    });
  }
  // const tour = await Tour.findOne({_id: tourId});
  res.status(200).json({
    status: "success",
    tour,
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  const tour = await Tour.findByIdAndUpdate(tourId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: tour,
  });
});

const deleteTour = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  await Tour.findByIdAndDelete(tourId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

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
