const express = require("express");
const {
  register,
  verify,
  login,
  resendOtp,
  profile,
  deleteUserAccount,
  updateProfile,
} = require("../controllers/userController");
const { googleSignIn } = require("../controllers/authController");
const upload = require("../utils/multer");
const authenticate = require("../utils/Auth");

const router = express.Router();

router.post("/verify", verify);
router.post("/resend-otp", resendOtp);
router.post("/register", upload.single("profile"), register);
router.post("/google-signin", googleSignIn);
router.post("/login", login);
router.get("/profile", authenticate, profile);
router.delete("/delete", authenticate, deleteUserAccount);
router.put(
  "/update",
  authenticate,
  upload.single("profilePhoto"),
  updateProfile
);

module.exports = router;
