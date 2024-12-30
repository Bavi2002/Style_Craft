const express = require("express");
const { register, verify, login } = require("../controllers/userController");
const { googleSignIn } = require("../controllers/authController");
const upload = require("../utils/multer");

const router = express.Router();

router.post("/verify", verify);
router.post("/register", upload.single("profile"), register);
router.post("/google-signin", googleSignIn);
router.get("/login", login);

module.exports = router;