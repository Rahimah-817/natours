const Tour = require("../model/tourSchema");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const aliesTopTours = async (req, res, next) => {
  req.query.limit = "6";
  req.query.sort = "ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};

const getAllTours = factory.getAll(Tour)
const getTour = factory.getOne(Tour, {path: 'reviews'})
const createTour = factory.createOne(Tour)
const updateTour = factory.updateOne(Tour)
const deleteTour = factory.deleteOne(Tour)

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
