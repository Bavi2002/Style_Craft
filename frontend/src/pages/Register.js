import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, User, MapPin, Phone, Lock, Upload } from "lucide-react";

import GoogleSignIn from "../components/GoogleSignIn";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profile: null,
  });

  const [preview, setPreiview] = useState(null);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      setErrors({ ...errors, profile: "File must be PNG or JPEG image." });
    } else {
      setFormData({ ...formData, profile: file });
      setPreiview(URL.createObjectURL(file));
    }
  };

  const handleKeyPress = (e) => {
    if (e.target.name === "name" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.name === "phone" && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.name === "address" && !/^[a-zA-Z0-9\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email must be a valid email address.";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error =
            "Phone number must be exactly 10 digits and contain no letters.";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters long.";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      formIsValid = false;
      newErrors.general = "All fields are required.";
    }

    if (formData.confirmPassword !== formData.password) {
      formIsValid = false;
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setGeneralError("");

    if (!validateForm()) {
      toast.error("Please fill out all required fields");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/verify", { state: { email: formData.email } });
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      if (error.response && error.response.status === 400) {
        toast.error(
          "This email is already registered. Please use a different one."
        );
      } else {
        setErrors({
          ...error.response?.data,
          general: "An error occurred. Please try again.",
        });
      }
    }
  };
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg8.jpg')" }}
    >
      <div className="font-lora container mx-auto w-full max-w-4xl min-h-screen flex flex-col items-center justify-center px-5 pt-36 pb-20">
        <div className="relative w-full h-auto bg-gray-200 bg-opacity-25 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex flex-col gap-6  border border-gray-300">
          <h1 className="text-center text-5xl text-black font-extrabold tracking-wider ">
            Welcome To{" "}
            <span className="text-blue-700 text-6xl">Style Craft</span>
          </h1>
          <p className="text-gray-700 font-medium text-2xl text-center">
            Create your account and join our community
          </p>
          {preview && (
            <div className="flex justify-center items-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full border border-black shadow-lg"
              />
            </div>
          )}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                id="registrationForm"
              >
                <label className="flex items-center font-medium text-lg text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg"
                />

                <label className="font-medium text-lg flex items-center text-gray-700">
                  {" "}
                  <MapPin className="w-4 h-4 mr-2" />
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg"
                />

                <label className="font-medium text-lg flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact No:
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Contact Number"
                  onKeyPress={handleKeyPress}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                <label className="text-lg font-medium flex items-center text-gray-700">
                  {" "}
                  <Lock className="w-4 h-4 mr-2" />
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg mt-4"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-medium text-lg flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-2" />
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <label className="font-medium text-lg flex items-center text-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Profile Picture:
              </label>
              <input
                type="file"
                name="profile"
                accept=""
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.profile && (
                <p className="text-red-500 text-sm">{errors.profile}</p>
              )}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
                <div className="flex items-center mt-4 w-full">
                  <hr className="flex-1 border-gray-600" />
                  <span className="mx-4 text-gray-700 font-semibold">or</span>
                  <hr className="flex-1 border-gray-600" />
                </div>
                <div className="w-full">
                  <GoogleSignIn setUser={setUser} />
                </div>
              </div>
              <p className="text-center text-gray-700 text-lg mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
