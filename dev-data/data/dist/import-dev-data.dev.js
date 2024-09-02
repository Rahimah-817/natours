"use strict";

var fs = require('fs');

var mongoose = require('mongoose');

var Tour = require('../../model/tourSchema');

var User = require('../../model/userSchema');

var Review = require('../../model/reviewSchema');

var dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.LOCAL_DATABASE));

        case 3:
          conn = _context.sent;
          console.log("MongoDB Connected successfully!");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error: ".concat(_context.t0.message));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

connectDB(); // READ JOSN FILE

var tours = JSON.parse(fs.readFileSync("".concat(__dirname, "/tours.json"), 'utf-8'));
var users = JSON.parse(fs.readFileSync("".concat(__dirname, "/users.json"), 'utf-8'));
var reviews = JSON.parse(fs.readFileSync("".concat(__dirname, "/reviews.json"), "utf-8")); // IMPORT DATA INTO DB

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tour.create(tours));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.create(users, {
            validateBeforeSave: false
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(Review.create(reviews));

        case 7:
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 12:
          process.exit();

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // DELETE ALL DATA FROM DB


var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.deleteMany({}, {
            timeout: 30000
          }));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.deleteMany({}, {
            timeout: 30000
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Review.deleteMany({}, {
            timeout: 30000
          }));

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 12:
          process.exit();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
//# sourceMappingURL=import-dev-data.dev.js.map
