const User = require("../models/User");
const bcryptjs = require("bcryptjs");

//Fire-Base Admin
var admin = require("firebase-admin");

var serviceAccount = require("../firebase-admin/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

    //For API Testing
    res.status(200).json({
      message: "User signed in successfully with Google",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Google Sign-In Failed", error: error.message });
  }
};

module.exports = { googleSignIn };
