const Cart = require("../models/Cart");
const Order = require("../models/Order");

const getOrderDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });

    const uniqueAddresses = [
      ...new Set(orders.map((order) => order.deliveryAddress)),
    ];

    const uniqueCardAddress = [
      ...new Map(
        orders
          .filter((order) => order.cardDetails && order.cardDetails.last4Digits)
          .map((order) => [
            `${order.cardDetails.cardType}-${order.cardDetails.last4Digits}`,
            order.cardDetails,
          ])
      ).values(),
    ];

    res.status(200).json({
      orders,
      deliveryAddress: uniqueAddresses,
      cardDetails: uniqueCardAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Order Details " });
  }
};

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deliveryAddress, paymentMethod, cardDetails } = req.body;

    const cartItems = await Cart.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is Empty" });
    }

    const totalAmount = cartItems.reduce((total, item) => {
      const productPrice = item.productId.price;
      const quantity = item.quantity;
      const discountPercentage = item.productId.discount || 0;

      const discountAmount = (productPrice * discountPercentage) / 100;

      const itemTotal = (productPrice - discountAmount) * quantity;

      return total + itemTotal;
    }, 0);

    const totalWithVAT = Math.round(totalAmount + totalAmount * 0.02);

    const cardType =
      paymentMethod === "Card" && cardDetails?.cardType
        ? cardDetails.cardType
        : undefined;
    const last4Digits =
      paymentMethod === "Card" && cardDetails?.number
        ? cardDetails.number.slice(-4)
        : undefined;

    const newOrder = new Order({
      userId,
      cartItems: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      deliveryAddress,
      paymentMethod,
      cardDetails:
        paymentMethod === "Card" ? { cardType, last4Digits } : undefined,
      totalAmount: totalWithVAT,
    });

    await newOrder.save();

    await Cart.deleteMany({ userId });

    res
      .status(201)
      .json({ message: "Order Placed Successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to Place Order" });
  }
};

module.exports = { getOrderDetails, placeOrder };
