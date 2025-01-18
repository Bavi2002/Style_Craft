const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  ],
  deliveryAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Card"],
    required: true,
  },
  cardDetails: {
    cardType: {
      type: String,
    },
    number: {
      type: String,
    },
    expDate: {
      type: String,
    },
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  careatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
