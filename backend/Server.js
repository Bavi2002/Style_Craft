const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening");
});
