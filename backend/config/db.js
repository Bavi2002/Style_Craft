const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected");
  } catch (error) {
    console.error("Error Connecting MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
