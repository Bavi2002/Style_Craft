const Subscribe = require("../controllers/simpleController")
const express = require("express");

const router = express.Router();

router.post("/subscribe", Subscribe);

module.exports =router;