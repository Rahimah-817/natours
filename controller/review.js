const Review = require("../model/reviewSchema");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { user: req.params.userId };
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: { reviews },
  });
});

const setTourAndUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createReview = factory.createOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourAndUserIds,
};
