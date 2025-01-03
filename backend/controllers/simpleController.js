const Subscription = require("../models/Subscription");
const { sendSubcription } = require("../utils/sendMail");

const Subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const isSubscribed = await Subscription.findOne({ email });
    if (isSubscribed) {
      return res.status(400).json({success: false, message: "Email Already Subscribed" });
    }

    const newSubscription = new Subscription({
      email,
    });

    await newSubscription.save();

    await sendSubcription(email);

    res.status(200).json({success: true, message:"Subscribed Successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Failed to Subscribe" });
  }
};

module.exports = Subscribe;
