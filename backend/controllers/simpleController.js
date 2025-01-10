const Subscription = require("../models/Subscription");
const { sendSubcription, sendContact } = require("../utils/sendMail");
const contact = require("../models/Contact");

const Subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const isSubscribed = await Subscription.findOne({ email });
    if (isSubscribed) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Subscribed" });
    }

    const newSubscription = new Subscription({
      email,
    });

    await newSubscription.save();

    await sendSubcription(email);

    res.status(200).json({ success: true, message: "Subscribed Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Subscribe" });
  }
};

const Contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new contact({
      name,
      email,
      message,
    });

    await newContact.save();
    await sendContact(email, name);

    res
      .status(200)
      .json({
        success: true,
        message: "Message Received! We'll Get Back To You Soon",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An Error occured. Please try again Later",
      });
  }
};

module.exports = { Subscribe, Contact };
