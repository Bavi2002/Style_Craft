import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Heart } from 'lucide-react';

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const sizeOptions = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colorOptions = ["#F5F5DC", "#808080", "#000080", "#000000"];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
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
    return (
      <div className="col-span-full flex justify-center items-center mt-52 mb-36">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    toast.error("Product Not Found");
    navigate("/product");
    return null;
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
          size: selectedSize,
          color: selectedColor,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 mt-28 font-lora">
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 ">
            <div className="relative group">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product?.name}
                  className="w-full h-[500px] object-cover rounded-xl shadow-lg transition duration-500 "
                />
              ) : (
                <div className="w-full h-[500px] bg-gray-100 rounded-xl shadow-lg flex items-center justify-center">
                  <img
                    src="/path/to/placeholder.png"
                    alt="No Image Available"
                    className="w-32 h-32 opacity-50"
                  />
                </div>
              )}
              
              {/* Floating discount badge */}
              {product?.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full font-medium animate-pulse">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-4  pb-2 max-w-full">
              {product?.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative rounded-lg overflow-hidden transition duration-300 transform ${
                    mainImage === img ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <div className={`absolute inset-0 bg-black/0 transition duration-300 ${
                    mainImage === img ? 'bg-black/0' : 'hover:bg-black/10'
                  }`} />
                </button>
              ))}
            </div>
          </div>
          </div>

          <div className="lg:w-1/2 p-8 pl-1  bg-gray-50/50">
            <div className="h-full flex flex-col">
              {/* Category Badge */}
              <span className="inline-flex items-center px-3 w-max py-1.5 rounded-full text-sm font-medium tracking-wide bg-blue-100 text-blue-800 mb-6">
                {product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}
              </span>

              {/* Product Title & Description */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product?.name.charAt(0).toUpperCase() + product?.name.slice(1)}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product?.description.charAt(0).toUpperCase() + product?.description.slice(1)}
                </p>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                {product?.discount > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-green-600">
                        Rs. {Math.round(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        Rs. {product.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-green-600">
                      You save: Rs. {(product.price * (product.discount / 100)).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    Rs. {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-8">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  product?.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    product?.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium">
                    {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

          <div className="mb-4">
            <label className="text-base font-medium text-gray-700 mb-2 block">
              Select Size:
            </label>
            <div className="flex gap-4">
              {sizeOptions.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-blue-500'
                      }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-base font-medium text-gray-700 mb-3">Select Color:</label>
            <div className="flex gap-7 flex-wrap mt-2">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full transition duration-300 transform hover:scale-110 ${
                        selectedColor === color
                          ? 'ring-2 ring-blue-600 ring-offset-2'
                          : ''
                      }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                        <span className="flex items-center justify-center h-full text-white">
                          ✓
                        </span>
                      )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product?.stock === 0}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition duration-300 transform ${
                    product?.stock === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={toggleLike}
                  className="p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition duration-300 transform active:scale-95"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'
                    }`}
                  />
                </button>
              </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
