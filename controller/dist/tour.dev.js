"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Tour = require("../model/tourSchema");

var AppError = require("../utils/appError");

var catchAsync = require("../utils/catchAsync");

var factory = require("./handlerFactory");

var aliesTopTours = function aliesTopTours(req, res, next) {
  return regeneratorRuntime.async(function aliesTopTours$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.query.limit = "6";
          req.query.sort = "ratingsAverage,price";
          req.query.fields = "name,price,ratingsAverage,summary,difficulty";
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getAllTours = factory.getAll(Tour);
var getTour = factory.getOne(Tour, {
  path: "review"
});
var createTour = factory.createOne(Tour);
var updateTour = factory.updateOne(Tour);
var deleteTour = factory.deleteOne(Tour);
var getTourState = catchAsync(function _callee(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $match: {
              ratingsAverage: {
                $gte: 4.5
              }
            }
          }, {
            $group: {
              _id: {
                $toUpper: "$difficulty"
              },
              numTours: {
                $sum: 1
              },
              numRatings: {
                $sum: "$ratingsQuantity"
              },
              avgRating: {
                $avg: "$ratingsAverage"
              },
              avgPrice: {
                $avg: "$price"
              },
              minPrice: {
                $min: "$price"
              },
              maxPrice: {
                $max: "$price"
              }
            }
          }, {
            $sort: {
              avgPrice: 1
            }
          }, {
            $match: {
              _id: {
                $ne: "EASY"
              }
            } // Use string representation of _id field

          }]));

        case 2:
          stats = _context2.sent;
          res.status(200).json({
            status: "success",
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getMonthlyPlan = catchAsync(function _callee2(req, res, next) {
  var year, plan;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          year = req.params.year * 1;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $unwind: "$startDates"
          }, {
            $match: {
              startDates: {
                $gte: new Date("".concat(year, "-01-01")),
                $lte: new Date("".concat(year, "-12-31"))
              }
            }
          }, {
            $group: {
              _id: {
                $month: "$startDates"
              },
              numTourStarts: {
                $sum: 1
              },
              tour: {
                $push: "$name"
              }
            }
          }, {
            $addFields: {
              month: "$_id"
            }
          }, {
            $project: {
              _id: 0
            }
          }, {
            $sort: {
              numTourStarts: -1
            }
          }, {
            $limit: 12
          }]));

        case 3:
          plan = _context3.sent;
          res.status(200).json({
            status: "success",
            index: plan.length,
            data: {
              plan: plan
            }
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var getToursWithin = catchAsync(function _callee3(req, res, next) {
  var _req$params, distance, latlng, unit, _latlng$split, _latlng$split2, lat, lng, radius, tours;

  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, distance = _req$params.distance, latlng = _req$params.latlng, unit = _req$params.unit;
          _latlng$split = latlng.split(","), _latlng$split2 = _slicedToArray(_latlng$split, 2), lat = _latlng$split2[0], lng = _latlng$split2[1];
          radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

          if (!(!lat || !lng)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new AppError("Please provide latitude and longitude in the format lat, lng.", 400)));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(Tour.find({
            startLocation: {
              $geoWithin: {
                $centerSphere: [[lng, lat], radius]
              }
            } // Make sure to reverse lat and lng

          }));

        case 7:
          tours = _context4.sent;
          res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
              data: tours
            }
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var getDistances = catchAsync(function _callee4(req, res, next) {
  var _req$params2, latlng, unit, _latlng$split3, _latlng$split4, lat, lng, multiplier, distances;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$params2 = req.params, latlng = _req$params2.latlng, unit = _req$params2.unit;
          _latlng$split3 = latlng.split(","), _latlng$split4 = _slicedToArray(_latlng$split3, 2), lat = _latlng$split4[0], lng = _latlng$split4[1];
          multiplier = unit === "mi" ? 0.000621371 : 0.001;

          if (!lat || !lng) {
            next(new AppError("Please provide latitutr and longitude in the format lat,lng.", 400));
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [lng * 1, lat * 1]
              },
              distanceField: "distance",
              distanceMultiplier: multiplier
            }
          }, {
            $project: {
              distance: 1,
              name: 1
            }
          }]));

        case 6:
          distances = _context5.sent;
          res.status(200).json({
            status: "success",
            data: {
              data: distances
            }
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  createTour: createTour,
  getAllTours: getAllTours,
  getTour: getTour,
  updateTour: updateTour,
  deleteTour: deleteTour,
  aliesTopTours: aliesTopTours,
  getTourState: getTourState,
  getMonthlyPlan: getMonthlyPlan,
  getToursWithin: getToursWithin,
  getDistances: getDistances
};
//# sourceMappingURL=tour.dev.js.map
