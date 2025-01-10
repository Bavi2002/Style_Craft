const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { sendOtp } = require("../utils/sendMail");
const uploadToAzure = require("../utils/azureBlob");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const register = async (req, res) => {
  try {
    const { name, email, address, phone, password } = req.body;
    const profile = req.file;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //For API Testing
    if (!name || !email || !address || !phone || !password) {
      throw new Error("All fields are required");
    }

    const hashPass = await bcryptjs.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    //For TESTING Purpose(delete Later)
    console.log("OTP Is: ", otp);

    //Temporarily Store User Data
    req.session.tempUserData = {
      name,
      email,
      address,
      phone,
      profile: profile
        ? {
            buffer: profile.buffer.toString("base64"),
            filename: profile.originalname,
          }
        : null,
      password: hashPass,
      otp,
      otpExpiry,
    };

    await sendOtp(email, otp);

    res.status(200).json({
      message: "OTP Sent To Your Email. Please Verify To Complete Registration",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Send OTP" });
  }
};

const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tempUserData = req.session.tempUserData;
    if (!tempUserData || tempUserData.email !== email)
      return res
        .status(400)
        .json({ message: "Invalid Email or Session Expired" });
    if (tempUserData.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (tempUserData.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP Has Expired" });

    let profilePhotoUrl =
      "http://localhost:5000/assets/images/default_profile.png";

    // Decode the buffer
    if (tempUserData.profile && tempUserData.profile.buffer) {
      tempUserData.profile.buffer = Buffer.from(
        tempUserData.profile.buffer,
        "base64"
      );

      // Upload Profile Photo to Azure Blob
      profilePhotoUrl = await uploadToAzure(
        tempUserData.profile.buffer,
        tempUserData.profile.filename,
        "profile-photos"
      );
    }
    const newUser = new User({
      name: tempUserData.name,
      email: tempUserData.email,
      address: tempUserData.address,
      phone: tempUserData.phone,
      password: tempUserData.password,
      profilePhoto: profilePhotoUrl,
    });

    await newUser.save();

    //Clear Temporary Session
    req.session.tempUserData = null;

    res
      .status(200)
      .json({ message: "User Verified & Registered Successfully" });
  } catch (error) {
    console.log("message", error.message);
    res
      .status(500)
      .json({ message: "Failed To Verify OTP and Save User Data" });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const tempUser = req.session.tempUserData;
    if (!tempUser || tempUser.email !== email) {
      return res
        .status(400)
        .json({ message: "Session Expired or Invalid Email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    //For TESTING Purpose(delete Later)
    console.log("OTP Is: ", otp);

    req.session.tempUserData.otp = otp;
    req.session.tempUserData.otpExpiry = otpExpiry;

    await sendOtp(email, otp);

    res.status(200).json({ message: "OTP Has Been Resend to Your Email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Resend OTP" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are Required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password Not Match" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login Successful",
      user: req.session.user,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Login" });
  }
};

module.exports = { register, verify, login, resendOtp };
