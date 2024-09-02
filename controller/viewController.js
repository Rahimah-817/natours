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
    path: "review",
    fields: "name review rating user",
  });

  if (!tour) {
    return res.status(404).render("404", { title: "Tour Not Found" });
  }

  res.status(200).render("tour", {
    title: tour.name,
    tour,
  });
});

module.exports = {
  getOverview,
  getTour,
};
