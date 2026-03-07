const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connect };