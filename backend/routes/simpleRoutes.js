const { Subscribe, Contact } = require("../controllers/simpleController");
const express = require("express");

const router = express.Router();

router.post("/subscribe", Subscribe);
router.post("/contact", Contact);

module.exports = router;
