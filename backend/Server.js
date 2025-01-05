const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const simpleRoutes = require("./routes/simpleRoutes");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

dotenv.config();

app.use(
  "/assets/images",
  express.static(path.join(__dirname, "assets", "images"))
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api", simpleRoutes);
app.use("/api/products", productRoutes);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
