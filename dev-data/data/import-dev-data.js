const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../model/tourSchema');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_DATABASE);

    console.log(`MongoDB Connected successfully!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
connectDB();

// READ JOSN FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany({}, { timeout: 30000 });
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
