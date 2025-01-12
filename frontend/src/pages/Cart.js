import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ cartItems, setCartItems }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart/viewcart",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = item.productId;
      if (!product || !product.price) return total;

      // Calculate the price after discount (if any)
      const discountPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      // Add the price after discount to the total, considering the quantity
      return total + discountPrice * item.quantity;
    }, 0);
  };

  const handleQuantityChange = async (
    productId,
    newQuantity,
    maxStock,
    size,
    color
  ) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/cart/updatecart",
        { productId, quantity: newQuantity, size, color },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: newQuantity } // Update the matching item
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId, size, color) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/deletecart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          data: { size, color },
        }
      );
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.productId &&
              item.productId._id === productId &&
              item.size === size &&
              item.color === color
            )
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-24 bg-gradient-to-br from-white to-gray-50 font-lora">
      <div className="relative mb-16 text-center">
        <h1 className="text-6xl font-black text-gray-900 tracking-tight mb-2">
          Your Cart
        </h1>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-70"></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg p-16 rounded-3xl shadow-2xl text-center border border-gray-100">
          <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="text-2xl font-medium text-gray-600 mb-8">
            Your cart is empty
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Product List Section */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((item) => {
              const product = item.productId;
              if (!product || !product.price || !product._id) return null;

              const discountPrice = product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price;

              return (
                <div
                  key={item._id}
                  className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-start space-x-8">
                      <div className="relative aspect-square">
                        <div className="w-36 h-36 rounded-2xl overflow-hidden bg-gray-50 group-hover:shadow-lg transition-all duration-500">
                          <img
                            alt={product.name}
                            onClick={() => handleClick(product._id)}
                            src={product.image[0]}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        {product.discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            -{product.discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              onClick={() => handleClick(product._id)}
                              className="text-2xl font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-all duration-300"
                            >
                              {product.name.charAt(0).toUpperCase() +
                                product.name.slice(1)}
                            </h3>

                            <div className="mt-4 space-y-3">
                              <div className="flex items-baseline">
                                {product.discount ? (
                                  <div className="space-x-3 flex items-baseline">
                                    <span className="text-2xl font-bold text-green-600">
                                      Rs.{Math.round(discountPrice).toFixed(2)}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                      Rs.{product.price.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-bold text-gray-900">
                                    Rs.{product.price.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-4">
                                {item.size && (
                                  <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                                    <span className="text-sm text-gray-500 mr-2">
                                      Size
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">
                                      {item.size}
                                    </span>
                                  </div>
                                )}

                                {item.color && (
                                  <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                                    <span className="text-sm text-gray-500 mr-2">
                                      Color
                                    </span>
                                    <div
                                      className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                                      style={{ backgroundColor: item.color }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                              Rs.
                              {Math.round(
                                discountPrice * item.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="inline-flex items-center p-1 bg-gray-50 rounded-2xl">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  item.quantity - 1,
                                  product.stock,
                                  item.size,
                                  item.color
                                )
                              }
                              disabled={item.quantity <= 1 || loading}
                              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                            >
                              <span className="text-gray-600 text-lg">−</span>
                            </button>
                            <span className="w-16 text-center text-lg font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  item.quantity + 1,
                                  product.stock,
                                  item.size,
                                  item.color
                                )
                              }
                              disabled={
                                item.quantity >= product.stock || loading
                              }
                              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                            >
                              <span className="text-gray-600 text-lg">+</span>
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              handleRemoveItem(
                                product._id,
                                item.size,
                                item.color
                              )
                            }
                            disabled={loading}
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-100/50 p-8 lg:sticky lg:top-44">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    Rs.{Math.round(calculateTotalPrice()).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>VAT (2%)</span>
                  <span className="font-medium">
                    Rs.{Math.round(calculateTotalPrice() * 0.02).toFixed(2)}
                  </span>
                </div>

                <div className="h-px bg-gray-200 my-6"></div>

                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-indigo-600">
                    Rs.{Math.round(calculateTotalPrice() * 1.02).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-violet-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none">
                Proceed to Checkout
              </button>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Free shipping on all orders
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
