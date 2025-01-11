import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // Added size state
  const [selectedColor, setSelectedColor] = useState(""); // Added color state
  const navigate = useNavigate();

  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]; // Size options
  const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"]; // Color options in RGB

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data.product);
        setMainImage(data.product.image ? data.product.image[0] : "");
      } catch (error) {
        toast.error("Something went wrong while fetching product details.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="spinner p-24">Loading...</div>; // Add a spinner here
  }

  if (!product) {
    return <div className="p-24">Product not found.</div>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    if (!product) {
      toast.error("Product details are not available.");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    const token = localStorage.getItem("jwtToken");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/addcart",
        {
          productId: product._id,
          quantity: 1,
          size: selectedSize, // Send size to the backend
          color: selectedColor, // Send color to the backend
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.message === "Item already added to cart") {
        toast.info("Item already added to cart.");
      } else {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      toast.error("Error adding product to cart. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-44">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image Section - All images on the left */}
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product?.name || "Product"}
              className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <img src="/path/to/placeholder.png" alt="No Image Available" className="w-32 h-32" />
            </div>
          )}

          {/* Thumbnails of all images */}
          <div className="flex gap-2">
            {product?.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border rounded-lg transition duration-300 transform ${
                  mainImage === img ? "border-2 border-blue-500 scale-110" : "border-2 border-gray-300"
                } hover:scale-105`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section on the Right */}
        <div className="w-full sm:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{product?.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product?.description}</p>

            <div className="text-xl font-bold text-gray-800 mb-4">
              <span className="text-green-500">Price:</span> ${product?.price}
            </div>

            <div
              className={`py-1 px-3 inline-block rounded-lg font-medium text-sm ${
                product.stock > 0
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            <div className="text-md text-gray-600 mb-6">
              <span className="font-medium">Category:</span> {product?.category}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-4">
            <label htmlFor="size" className="text-sm font-medium text-gray-700">
              Size:
            </label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Size</option>
              {sizeOptions.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div className="mb-4">
            <label htmlFor="color" className="text-sm font-medium text-gray-700">
              Color:
            </label>
            <div className="flex items-center gap-4 mt-2">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 ${
                    selectedColor === color ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 active:scale-95 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
