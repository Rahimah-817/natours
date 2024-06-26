const Review = require("../model/reviewSchema");
const factory = require("./handlerFactory");
// const catchAsync = require("../utils/catchAsync");

const setTourAndUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getAllReviews = factory.getAll(Review);
const getReview = factory.getOne(Review);
const createReview = factory.createOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
  setTourAndUserIds,
};
