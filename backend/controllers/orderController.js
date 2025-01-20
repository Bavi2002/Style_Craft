const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { sendOrderConfirmation } = require("../utils/sendMail");

const getOrderDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });

    const user = await User.findById(userId);

    const orderDetailsWithProducts = await Promise.all(
      orders.map(async (order) => {
        const cartItemsWithDetails = await Promise.all(
          order.cartItems.map(async (cartItem) => {
            const product = await Product.findById(cartItem.productId);

            const productImage = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

            return {
              ...cartItem,
              productId:product._id,
              productName: product.name,
              productImage: productImage,
              productSize: cartItem.size,
              productColor: cartItem.color,
              productQty: cartItem.quantity,
            };
          })
        );

        return {
          ...order.toObject(),
          cartItems: cartItemsWithDetails,
        };
      })
    );

    const uniqueAddresses = [
      ...new Set(orders.map((order) => order.deliveryAddress)),
    ];

    const uniqueCardAddress = [
      ...new Map(
        orders
          .filter((order) => order.cardDetails && order.cardDetails.number)
          .map((order) => [
            `${order.cardDetails.cardType}-${order.cardDetails.number}-${order.cardDetails.expDate}`,
            order.cardDetails,
          ])
      ).values(),
    ];

    const phoneNumbers = orders.map((order) => order.phoneNumber);

    res.status(200).json({
      orders: orderDetailsWithProducts,
      deliveryAddress: uniqueAddresses,
      cardDetails: uniqueCardAddress,
      phoneNumbers,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Order Details " });
  }
};

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deliveryAddress, paymentMethod, cardDetails, phoneNumber } =
      req.body;

    const user = await User.findById(userId);

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
    const number =
      paymentMethod === "Card" && cardDetails?.number
        ? cardDetails.number.slice(-4)
        : undefined;
    const expDate =
      paymentMethod === "Card" && cardDetails?.expDate
        ? cardDetails.expDate
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
      phoneNumber,
      email: user.email,
      paymentMethod,
      cardDetails:
        paymentMethod === "Card" ? { cardType, number, expDate } : undefined,
      totalAmount: totalWithVAT,
    });

    await newOrder.save();
    for (const item of cartItems) {
      const product = item.productId;
      const newStock = product.stock - item.quantity;
      await Product.findByIdAndUpdate(product._id, { stock: newStock });
    }

    await Cart.deleteMany({ userId });
    await sendOrderConfirmation(user, cartItems, deliveryAddress, paymentMethod, totalWithVAT);

    res
      .status(201)
      .json({ message: "Order Placed Successfully", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Place Order" });
  }
};

module.exports = { getOrderDetails, placeOrder };
