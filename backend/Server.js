const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

dotenv.config();

connectDB();

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
