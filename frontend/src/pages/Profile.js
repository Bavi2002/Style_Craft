import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Edit, Trash, Mail, Phone, MapPin, Badge } from "lucide-react";
import { Package, ExternalLink } from "lucide-react";

const UserProfile = ({ setUser }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const [editMode, setEditMode] = useState({
    phone: false,
    address: false,
    profilePhoto: false,
  });
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    profilePhoto: null,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(response.data);
        setUser(response.data);
        setFormData((prev) => ({
          ...prev,
          phone: response.data.phone || "",
          address: response.data.address || "",
        }));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchUserProfile();
    fetchOrderDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const handleSave = async (field) => {
    if (field === "phone" && !validatePhoneNumber(formData.phone)) {
      toast.error(
        "Phone number must be exactly 10 digits and contain only numbers."
      );
      return;
    }

    const updatedData = new FormData();

    if (field === "profilePhoto" && formData.profilePhoto) {
      updatedData.append("profilePhoto", formData.profilePhoto);
    } else {
      updatedData.append(field, formData[field]);
    }
    if (field !== "phone") {
      updatedData.append("phone", formData.phone);
    }
    if (field !== "address") {
      updatedData.append("address", formData.address);
    }

    try {
      const updatedUser = await updateProfile(updatedData);
      setFormData((prev) => ({ ...prev, ...updatedUser }));
      setEditMode((prev) => ({ ...prev, [field]: false }));
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Cannot Change Profile Picture");
      throw new Error("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/users/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      localStorage.clear();
      navigate("/home");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting account");
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Failed to Fetch Previous Order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-28 ">
      {userDetails ? (
        <div className="flex flex-col lg:flex-row gap-8 justify-center  mb-11">
          <div className="p-4 md:p-8  lg:top-36 overflow-hidden ">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Profile Header */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-6 md:px-8 pb-8">
                  <div className="flex flex-col md:flex-row items-center gap-6 -mt-16">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden  relative">
                        <img
                          src={
                            formData.profilePhoto
                              ? URL.createObjectURL(formData.profilePhoto)
                              : userDetails.profilePhoto
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        {editMode.profilePhoto ? (
                          <div>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </div>
                            <button
                              onClick={() => {
                                handleSave("profilePhoto");
                              }}
                              className="absolute bottom-2 right-2 bg-white p-2 rounded-xl shadow-md hover:shadow-lg"
                            >
                              save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditMode({ profilePhoto: true });
                            }}
                            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                          >
                            <Edit className="w-4 h-4 text-gray-900" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h2 className="text-3xl font-semibold text-white tracking-wider font-lora pb-3">
                            {userDetails.name}
                          </h2>
                          <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              <Badge className="w-3 h-3" />
                              Premium Member
                            </span>
                            <span className="text-sm text-gray-500">
                              Member since 2024
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8">
                  Personal Information
                </h3>
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="group bg-gray-50/50 rounded-2xl p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50">
                    <div className="flex items-center gap-6">
                      <div className="p-3 bg-indigo-100 rounded-xl">
                        <Mail className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          {userDetails.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="group bg-gray-50/50 rounded-2xl p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50">
                    <div className="flex items-center gap-6">
                      <div className="p-3 bg-indigo-100 rounded-xl">
                        <Phone className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        {editMode.phone ? (
                          <div className="flex justify-between items-center mt-2">
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                            <button
                              onClick={() => handleSave("phone")}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-medium"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-900 font-medium">
                              {userDetails.phone}
                            </p>
                            <button
                              onClick={() => setEditMode({ phone: true })}
                              className="p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="group bg-gray-50/50 rounded-2xl p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50">
                    <div className="flex items-center gap-6">
                      <div className="p-3 bg-indigo-100 rounded-xl">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          Address
                        </p>
                        {editMode.address ? (
                          <div className="flex justify-between items-center mt-2">
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                            <button
                              onClick={() => handleSave("address")}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm font-medium"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-900 font-medium">
                              {userDetails.address}
                            </p>
                            <button
                              onClick={() => setEditMode({ address: true })}
                              className="p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Permanently delete your account and all of its contents.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash className="w-5 h-5 transition-transform group-hover:scale-110" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl shadow-lg p-6 space-y-6 mt-8 mb-auto ">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                Your Orders
              </h2>
              <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <Package className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">
                  No orders yet
                </h3>
                <p className="text-slate-500 text-center mt-2">
                  Your order history will appear here once you make a purchase
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="group bg-white rounded-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-100"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            ORDER ID
                          </p>
                          <p className="text-sm font-semibold text-slate-700 mt-0.5">
                            #{order._id.slice(-8)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/product`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200"
                          >
                            <span>Details</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4 ">
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-4 p-3 rounded-lg transition-colors duration-200 hover:bg-slate-50 "
                        >
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <Link
                              key={item._id}
                              to={`/products/${item.productId}`}
                            >
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </Link>
                          </div>

                          <div className="flex-1 min-w-0">
                            <Link
                              key={item._id}
                              to={`/products/${item.productId}`}
                            >
                              <h4 className="font-medium text-slate-900 truncate">
                                {item.productName}
                              </h4>{" "}
                            </Link>

                            <div className="mt-2 flex flex-wrap gap-3">
                              <div className="inline-flex items-center gap-1.5">
                                <span className="text-xs text-slate-500">
                                  Size
                                </span>
                                <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-700">
                                  {item.productSize}
                                </span>
                              </div>

                              <div className="inline-flex items-center gap-1.5">
                                <span className="text-xs text-slate-500">
                                  Color
                                </span>
                                <div
                                  className="w-4 h-4 rounded-full border border-slate-200"
                                  style={{
                                    backgroundColor: item.productColor,
                                  }}
                                />
                              </div>

                              <div className="inline-flex items-center gap-1.5">
                                <span className="text-xs text-slate-500">
                                  Qty
                                </span>
                                <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-700">
                                  {item.productQty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center  pt-24">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-600">
              Loading Profile...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
