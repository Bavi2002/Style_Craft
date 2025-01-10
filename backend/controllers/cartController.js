const Cart = require("../models/Cart");
const Product = require("../models/Product");

const AddCart = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "User not logged in." });
  }

  try {
    const { productId, quantity } = req.body;

    const userId = req.user.id;

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      return res.status(200).json({ message: "Item already added to cart" });
    } else {
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }

    res.status(200).json({ message: "Item Added to Cart", cartItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To Add to Cart" });
  }
};

const UpdateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (quantity > product.stock || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not Fiund in Cart" });
    }

    res.status(200).json({ message: "Cart Updated", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Failed To Update Cart", error });
  }
};

const RemoveCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    const deletedItem = await Cart.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item Not Found In The Cart" });
    }

    res.status(200).json({ message: "Item Removed From the Cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed To Remove Item From Cart" });
  }
};

const ViewCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed To Fetch Cart" });
  }
};

module.exports = { AddCart, UpdateCart, RemoveCart, ViewCart };
