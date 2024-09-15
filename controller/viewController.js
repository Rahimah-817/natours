const Tour = require("../model/tourSchema");
const catchAsync = require("../utils/catchAsync");

const getOverview = catchAsync(async (req, res, next) => {
  // 1) get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1.
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

const getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

const getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
});
const getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render("signup", {
    title: "Create an account",
  });
});

const getAccount = (req, res) => {
   res.status(200).render("account", {
     title: "Your account",
   });
}

module.exports = {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
};
