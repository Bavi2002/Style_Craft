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
router.put("/updatecart", UpdateCart);
router.delete("/deletecart/:productId", RemoveCart);
router.get("/viewcart", ViewCart);

module.exports = router;
