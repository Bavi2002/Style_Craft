import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ user, cartItems, setCartItems }) => {
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

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleQuantityChange = async (productId, newQuantity, maxStock) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/cart/updatecart",
        { productId, quantity: newQuantity },
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
            item.productId && item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/deletecart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId && item.productId._id !== productId)
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-28">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>
  
    {cartItems.length === 0 ? (
      <div className="text-xl text-gray-600 text-center">
        Your cart is empty. Add items to your cart to proceed.
      </div>
    ) : (
      <div className="space-y-6">
        {cartItems.map((item) => {
          const product = item.productId;
          if (!product || !product.price|| !product._id) return null;
  
          return (
            <div key={item._id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-6">
                <img alt={product.name} src={product.image[0]} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex flex-col">
                  <div className="text-lg font-semibold text-gray-700">{product.name}</div>
                  <div className="text-sm text-gray-500">Price: Rs.{product.price.toFixed(2)}</div>
                </div>
              </div>
  
              <div className="flex items-center space-x-4">
                {/* Quantity adjustment buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id,
                        item.quantity - 1,
                        product.stock
                      )
                    }
                    disabled={item.quantity <= 1 || loading}
                    className="bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id,
                        item.quantity + 1,
                        product.stock
                      )
                    }
                    disabled={item.quantity >= product.stock || loading}
                    className="bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
  
                {/* Remove item button */}
                <button
                  onClick={() => handleRemoveItem(product._id)}
                  disabled={loading}
                  className="text-red-500 text-xl hover:text-red-700 disabled:opacity-50"
                >
                  &#10005; {/* Cross symbol */}
                </button>
              </div>
  
              <div className="text-lg font-medium text-gray-700">
                Total: Rs.{(product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    )}
  
    {cartItems.length > 0 && (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-right">
        <h3 className="text-2xl font-semibold text-gray-800">
          Total Price: Rs.{calculateTotalPrice().toFixed(2)}
        </h3>
      </div>
    )}
  </div>
  
  );
};

export default Cart;
