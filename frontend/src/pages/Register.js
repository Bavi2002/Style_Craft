import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profile: null,
  });

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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          onKeyPress={handleKeyPress}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}

        <input type="file" name="profile" onChange={handleFileChange} />
        {errors.profile && <p className="error-message">{errors.profile}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
