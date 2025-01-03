import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      setErrors({ ...errors, profile: "File Must be PNG or JPEG Image" });
    } else {
      setFormData({ ...formData, profile: file });
      setPreiview(URL.createObjectURL(file));
    }
  };

  const handleKeyPress = (e) => {
    // Allow only letters and spaces in the name field
    if (e.target.name === "name" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault();
    }

    // Allow only digits in the contactNo field
    if (e.target.name === "phone" && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }

    // Allow only letters, digits, and spaces in the address field
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        console.log(response.data.message);
        navigate("/verify", { state: { email: formData.email } });
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      if (error.response && error.response.status === 400) {
        alert("This Email Already Registered. Please Use a Different Email");
      } else {
        setErrors(error.response?.data || { message: error.message });
      }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg3.jpg')" }}
    >
      <div className="font-lora container mx-auto w-full max-w-4xl min-h-screen flex flex-col items-center justify-center p-16 pt-40">
        <div className="relative w-full h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex flex-col gap-6 border-gray-400 border-2">
          {preview && (
            <div className="absolute top-4 right-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full border-4 border-cyan-700 shadow-lg"
              />
            </div>
          )}

          <h1 className="text-center text-5xl text-blue-800 font-extrabold tracking-wider mb-5">
            SignIn
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                id="registrationForm"
              >
                <label className="font-medium text-lg ">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  required
                  className="placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-base p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="font-medium text-lg">Address:</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  className="placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-base p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="font-medium text-lg">Contact No:</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Contact Number"
                  onKeyPress={handleKeyPress}
                  value={formData.phone}
                  onChange={handleChange}
                  className="placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-base p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                <label className="text-xl font-bold">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="placeholder:tracking-wide placeholder:text-base p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
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
                  className="placeholder:tracking-wide placeholder:text-base placeholder:text-white p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-medium text-lg">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-base p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <label className="font-medium text-lg">Profile Picture:</label>
              <input
                type="file"
                name="profile"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className=" p-3 border bg-white bg-opacity-40 backdrop-blur-lg border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.profile && (
                <p className="text-red-500 text-sm">{errors.profile}</p>
              )}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="mt-6 bg-blue-800 text-white py-3 px-4 w-80 justify-center rounded-lg font-bold transform hover:scale-105 transition duration-300 shadow-lg"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <GoogleSignIn setUser={setUser} />
              </div>
              <p className="text-center mt-4 text-black text-lg tracking-wide font-semibold">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-800 font-bold underline tracking-wider"
                >
                  Login
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
