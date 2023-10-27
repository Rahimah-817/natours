const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    console.log(`MongoDB Connected successfully!`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
