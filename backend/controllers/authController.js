const User = require("../models/User");
const jwt = require("jsonwebtoken");
//Fire-Base Admin
var admin = require("firebase-admin");

var serviceAccount = require("../firebase-admin/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const JWT_SECRET = process.env.JWT_SECRET;

//Google-SignIn
const googleSignIn = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture, uid } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        googleId: uid,
        email,
        name,
        profilePhoto: picture,
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    //For API Testing
    res.status(200).json({
      message: "User signed in successfully with Google",
      user: {
        _id: user._id,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Google Sign-In Failed", error: error.message });
  }
};

module.exports = { googleSignIn };
