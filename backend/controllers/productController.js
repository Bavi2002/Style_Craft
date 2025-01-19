const Product = require("../models/Product");
const {uploadToAzure, deleteProfilePhotoFromAzure} = require("../utils/azureBlob");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, discount } = req.body;
    const files = req.files;

    //API Testing
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    if (!files || files.length < 2 || files.length > 4) {
      return res.status(400).json({ message: "Upload between 2 to 4 Images" });
    }

    const imageUrls = await Promise.all(
      files.map((file) =>
        uploadToAzure(file.buffer, file.originalname, "product-images")
      )
    );

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      discount,
      image: imageUrls,
    });

    await product.save();

    res.status(200).json({ message: "Product Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to Add Product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to Display Products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product Id Required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Failed to Display the Product" });
  }
};

module.exports = { addProduct, getProducts, getSingleProduct };
