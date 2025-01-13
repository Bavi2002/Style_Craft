const express = require("express");
const {getOrderDetails,placeOrder} = require("../controllers/orderController");

const authenticate = require("../utils/Auth");
const router = express.Router();

router.get("/", authenticate, getOrderDetails);
router.post("/add", authenticate, placeOrder);

module.exports = router;