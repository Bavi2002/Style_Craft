const {addProduct, getProducts} = require("../controllers/productController");
const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer()

router.post("/add",upload.array("images"), addProduct);
router.get("/", getProducts);

module.exports = router;