const Review = require("../../model/reviewSchema");
const catchAsync = require("../../utils/catchAsync");

const createReview = catchAsync(async (req, res, next) => {
  // Allows nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: { review: newReview },
  });
});

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: { reviews },
  });
});

module.exports = {
  createReview,
  getAllReviews,
};