const express = require("express");
const {
  AddCart,
  UpdateCart,
  RemoveCart,
  ViewCart,
} = require("../controllers/cartController");

const authenticate = require("../utils/Auth");

const router = express.Router();

router.post("/addcart", authenticate, AddCart);
router.put("/updatecart", authenticate, UpdateCart);
router.delete("/deletecart/:productId", authenticate, RemoveCart);
router.get("/viewcart", authenticate, ViewCart);

module.exports = router;
