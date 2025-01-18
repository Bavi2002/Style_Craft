import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRight } from "lucide-react";
import { CreditCard, Calendar, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems, setCartItems }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    district: "",
    postalCode: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    number: "",
    expDate: "",
  });
  const [showCardSelection, setShowCardSelection] = useState(false);
  const [previousCards, setPreviousCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardType: "",
    number: "",
    expDate: "",
  });

  const visaLogo = "/assets/images/visa.png";
  const masterCardLogo = "/assets/images/master.jpg";
  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(
          "http://localhost:5000/api/order",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddresses(orderResponse.data.deliveryAddress);
        setPreviousCards(orderResponse.data.cardDetails);
        setPhoneNumbers(orderResponse.data.phoneNumbers);
        setEmail(orderResponse.data.email);

        const cartResponse = await axios.get(
          "http://localhost:5000/api/cart/viewcart",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleAddressClick = (address, phone) => {
    setSelectedAddress(address);
    setPhoneNumber(phone);
    setShowAddressSelection(false);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndAddAddress = () => {
    const errors = {};
    if (!newAddress.street.trim()) errors.street = "Street address is required";
    if (!newAddress.city.trim()) errors.city = "City is required";
    if (!newAddress.district.trim()) errors.district = "District is required";
    if (!newAddress.postalCode.trim())
      errors.postalCode = "Postal code is required";
    if (!phoneNumber.trim() || phoneNumber.length !== 10)
      errors.phoneNumber = "Valid phone number is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formattedAddress = `${newAddress.street}, ${newAddress.city}, ${newAddress.district}, ${newAddress.postalCode}`;
      setAddresses((prev) => [...prev, formattedAddress]);
      setPhoneNumbers((prev) => [...prev, phoneNumber]);
      setSelectedAddress(formattedAddress);
      setNewAddress({ street: "", city: "", district: "", postalCode: "" });
      setPhoneNumber("");
      setFormErrors({});
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        deliveryAddress: selectedAddress,
        phoneNumber,
        paymentMethod: selectedPaymentMethod,
        cardDetails,
      };
      const response = await axios.post(
        "http://localhost:5000/api/order/add",
        orderData, // Correct position for the payload
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error placing order", error);
      alert("Failed to place order");
    }
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
  const getUniqueAddresses = (addresses, phoneNumbers) => {
    const uniqueSet = new Set();
    const uniqueAddresses = [];

    addresses.forEach((address, index) => {
      const key = `${address}-${phoneNumbers[index]}`;
      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        uniqueAddresses.push({ address, phone: phoneNumbers[index] });
      }
    });

    return uniqueAddresses;
  };

  const uniqueAddresses = getUniqueAddresses(addresses, phoneNumbers);

  const handleAddCard = () => {
    if (!newCard.cardType) {
      toast.error("Please select a card type.");
      return;
    }

    // Validation for Last 4 Digits
    if (
      !newCard.number ||
      newCard.number.length !== 4 ||
      isNaN(newCard.number)
    ) {
      toast.error("Please enter the last 4 digits of the card.");
      return;
    }

    // Validation for Expiration Date (MM/YY)
    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Match format MM/YY
    if (!newCard.expDate || !expDateRegex.test(newCard.expDate)) {
      toast.error("Please enter a valid expiration date in MM/YY format.");
      return;
    }
    if (newCard.cardType && newCard.number && newCard.expDate) {
      // Add new card logic, for example, send it to backend
      console.log("Card added:", newCard);
      setPreviousCards((prev) => [...prev, newCard]); // Add new card to previousCards
      setNewCard({
        cardType: "",
        number: "",
        expDate: "",
      });
    } else {
      alert("Please fill in all card details.");
    }
  };
  return (
    <div className="min-h-screen pt-20 font-lora bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Bar */}
        <h1 className="text-center text-6xl font-bold tracking-wide mb-9 text-black">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow space-y-8">
            {/* Delivery Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 backdrop-blur-lg backdrop-filter">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Delivery Address
                  </h2>
                  {!showAddressSelection && (
                    <button
                      onClick={() => setShowAddressSelection(true)}
                      className="text-blue-600 hover:text-indigo-600 font-semibold text-sm flex items-center transition-colors duration-200"
                    >
                      Select <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {!selectedAddress && !showAddressSelection && (
                  <div className="text-center font-medium text-lg">
                    No Delivery Address Selected
                  </div>
                )}
                {!showAddressSelection && selectedAddress && (
                  <div className="p-6 font-mono bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-inner">
                    <div className="text-gray-700 space-y-2">
                      {selectedAddress.split(", ").map((line, idx, arr) => (
                        <div
                          key={idx}
                          className="text-gray-800 font-medium  tracking-wide"
                        >
                          {line}
                          {idx < arr.length && ","}
                        </div>
                      ))}
                      <div className="text-gray-700 font-medium tracking-wider">
                        {phoneNumber}.
                      </div>
                      <div className="text-gray-700 font-semibold tracking-wide text-lg">
                        {email}.
                      </div>
                    </div>
                  </div>
                )}

                {showAddressSelection && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
                      {uniqueAddresses.map((item, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleAddressClick(item.address, item.phone)
                          }
                          className="text-left text-lg font-medium p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 group transform hover:-translate-y-1 bg-white shadow-lg"
                        >
                          <div className="space-y-2">
                            {typeof item.address === "string"
                              ? item.address
                                  .split(", ")
                                  .map((line, idx, arr) => (
                                    <div
                                      key={idx}
                                      className="text-gray-700 group-hover:text-gray-900"
                                    >
                                      {line}
                                      {idx < arr.length - 1 && ","}
                                    </div>
                                  ))
                              : Object.values(item.address || {}).map(
                                  (line, idx) => (
                                    <div
                                      key={idx}
                                      className="text-gray-700 group-hover:text-gray-900"
                                    >
                                      {line}
                                    </div>
                                  )
                                )}
                            <div className="text-gray-700 group-hover:text-gray-900">
                              {item.phone}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        Add New Address
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {["street", "city", "district", "postalCode"].map(
                          (field) => (
                            <div key={field} className="relative">
                              <input
                                name={field}
                                placeholder={
                                  field.charAt(0).toUpperCase() +
                                  field.slice(1).replace(/([A-Z])/g, " $1")
                                }
                                value={newAddress[field]}
                                onChange={handleNewAddressChange}
                                className={`block w-full px-6 py-4 rounded-2xl border-2 ${
                                  formErrors[field]
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200"
                                } focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 text-sm placeholder-gray-400`}
                              />
                            </div>
                          )
                        )}
                        <input
                          name="phoneNumber"
                          type="tel"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`block w-full px-6 py-4 rounded-2xl border-2 ${
                            formErrors.phoneNumber
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200"
                          } focus:border-blue-500 focus:ring-blue-500 text-sm transition-all duration-200 placeholder-gray-400`}
                        />
                      </div>
                      <button
                        onClick={validateAndAddAddress}
                        className="mt-4 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Items */}

            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="col-span-full flex justify-center items-center mt-24">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-gray-600">
                      Loading products...
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => {
                  const product = item.productId;
                  if (!product || !product.price || !product._id) return null;

                  const discountPrice = product.discount
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;

                  return (
                    <div
                      key={item._id}
                      className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex gap-6  items-center justify-center">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                              <img
                                alt={product.name}
                                src={product.image[0]}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                          </div>

                          <div className="flex-grow">
                            <div className="flex justify-between ">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 ">
                                  {product.name.charAt(0).toUpperCase() +
                                    product.name.slice(1)}
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-3">
                                  {item.size && (
                                    <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-xl shadow-inner">
                                      <span className="text-sm font-medium text-gray-700">
                                        Size: {item.size}
                                      </span>
                                    </div>
                                  )}
                                  {item.color && (
                                    <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-xl shadow-inner">
                                      <span className="text-sm font-medium text-gray-700 mr-2">
                                        Color:
                                      </span>
                                      <div
                                        className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: item.color }}
                                      />
                                    </div>
                                  )}
                                  <div className="px-6 py-2 bg-gray-100 rounded-xl  shadow-inner">
                                    <span className="text-sm font-semibold text-gray-700">
                                      Qty: {item.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ">
                                <div className="space-y-1">
                                  <div className=" text-gray-800">
                                    Rs.{Math.round(discountPrice).toFixed(2)} ×{" "}
                                    {item.quantity} =
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    Rs.
                                    {Math.round(
                                      discountPrice * item.quantity
                                    ).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 backdrop-blur-lg backdrop-filter">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Payment Method
                  </h2>
                  {!showPaymentSelection && (
                    <button
                      onClick={() => setShowPaymentSelection(true)}
                      className="text-blue-600 hover:text-indigo-600 font-semibold text-sm flex items-center transition-colors duration-200"
                    >
                      Select <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 ">
                {!selectedPaymentMethod && !showPaymentSelection && (
                  <div className="text-center font-medium text-lg">
                    No Payment Method Selected
                  </div>
                )}

                {selectedPaymentMethod === "COD" && !showPaymentSelection && (
                  <div className="font-mono p-6 text-center font-medium text-lg bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-inner">
                    Cash on Delivery
                  </div>
                )}

                {selectedPaymentMethod === "Card" && !showPaymentSelection && (
                  <div className="p-6 font-mono bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-inner">
                    <div className="text-gray-700 space-y-2">
                      <img
                        src={
                          cardDetails.cardType === "Visa"
                            ? visaLogo
                            : masterCardLogo
                        }
                        alt="Card Type"
                        className="h-12 mb-2"
                      />
                      <div className="text-gray-800 font-medium tracking-wide">
                        **** **** **** {cardDetails.number}
                      </div>
                      <div className="text-gray-700 font-medium tracking-wide">
                        Exp: {cardDetails.expDate}
                      </div>
                    </div>
                  </div>
                )}

                {showPaymentSelection && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setSelectedPaymentMethod("COD");
                          setShowPaymentSelection(false);
                          setShowCardSelection(false);
                        }}
                        className="text-left text-lg font-medium p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
                      >
                        Cash on Delivery
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaymentMethod("Card");
                          setShowCardSelection(true);
                        }}
                        className="text-left text-lg font-medium p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
                      >
                        Card Payment
                      </button>
                    </div>
                  </div>
                )}

                {showCardSelection && (
                  <div className="mt-5">
                    <div className="grid grid-cols-3 gap-x-2">
                      {previousCards.map((card, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCardDetails({
                              cardType: card.cardType,
                              number: card.number,
                              expDate: card.expDate,
                            });
                            setSelectedPaymentMethod("Card");
                            setShowPaymentSelection(false);
                            setShowCardSelection(false);
                          }}
                          className="text-left text-lg font-medium p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
                        >
                          <img
                            src={
                              card.cardType === "Visa"
                                ? visaLogo
                                : masterCardLogo
                            }
                            alt="Card Type"
                            className="h-12 mb-2"
                          />
                          <div className="text-gray-700">
                            **** **** **** {card.number}
                          </div>
                          <div className="text-gray-700">
                            Exp: {card.expDate}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card Type */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Card Type
                          </label>
                          <div className="relative">
                            <select
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl appearance-none focus:border-blue-500  focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
                              value={newCard.cardType}
                              onChange={(e) =>
                                setNewCard({
                                  ...newCard,
                                  cardType: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                -Select Card Type-
                              </option>
                              <option value="Visa">Visa</option>
                              <option value="MasterCard">MasterCard</option>
                            </select>
                            <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Last 4 Digits */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Last 4 Digits
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              maxLength="4"
                              value={newCard.number}
                              onChange={(e) =>
                                setNewCard({
                                  ...newCard,
                                  number: e.target.value,
                                })
                              }
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
                              placeholder="•••• •••• •••• 1234"
                            />
                            <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Expiration Date */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Expiration Date
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={newCard.expDate}
                              onChange={(e) =>
                                setNewCard({
                                  ...newCard,
                                  expDate: e.target.value,
                                })
                              }
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
                            />
                            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Card Holder's Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="Name on card"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
                            />
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        {/* CVV */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="•••"
                              maxLength="3"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
                            />
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            3-digit security code on back of card
                          </p>
                        </div>
                      </div>

                      {/* Card Icons */}
                      <div className="mt-6 flex items-center space-x-4">
                        <div className="text-sm text-gray-500">We accept:</div>
                        <div className="flex space-x-2">
                          <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">
                              VISA
                            </span>
                          </div>
                          <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">
                              MC
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={handleAddCard}
                          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                          Add Card
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-36 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">
                    Rs.{Math.round(calculateTotalPrice()).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">VAT (2%)</span>
                  <span className="font-bold">
                    Rs.{Math.round(calculateTotalPrice() * 0.02).toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Rs.{Math.round(calculateTotalPrice() * 1.02).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Continue to Payment
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  By continuing, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
