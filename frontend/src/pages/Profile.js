import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Mail, Phone, MapPin, Badge } from "lucide-react";

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

  return (
    <div className="pt-60">
      {userDetails ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Card */}
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

            {/* Details Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="group relative bg-gray-50 rounded-2xl p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium mt-1">
                        {userDetails.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gray-50 rounded-2xl p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      {editMode.phone ? (
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 w-max px-2 border rounded-xl py-1"
                          />
                          <button
                            onClick={() => {
                              handleSave("phone");
                            }}
                            className="p-2 rounded-xl opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-md bg-green-500 text-white px-4"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-900 font-medium mt-1">
                            {userDetails.phone}
                          </p>
                          <button
                            onClick={() => {
                              setEditMode({ phone: true });
                            }}
                            className="p-2 rounded-xl opacity-100 transition-all duration-300 hover:bg-white hover:shadow-md"
                          >
                            <Edit className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gray-50 rounded-2xl p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">
                        Address
                      </p>
                      {editMode.address ? (
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 w-max px-2 border rounded-xl py-1"
                          />
                          <button
                            onClick={() => {
                              handleSave("address");
                            }}
                            className="p-2 rounded-xl opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-md bg-green-500 text-white px-4"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-900 font-medium mt-1">
                            {userDetails.address}
                          </p>
                          <button
                            onClick={() => {
                              setEditMode({ address: true });
                            }}
                            className="p-2 rounded-xl opacity-100 transition-all duration-300 hover:bg-white hover:shadow-md"
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

            {/* Actions Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Permanently delete your account and all of its contents.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Trash className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center mb-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-600">
              Loading products...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
