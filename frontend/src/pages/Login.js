import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import GoogleSignIn from "../components/GoogleSignIn";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/home");
      }
    } catch (error) {
      setErrors(error.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg1.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="bg-gray-100 bg-opacity-20 backdrop-blur-lg p-8  rounded-3xl shadow-xl w-96 border-gray-400 border-2">
          <h1 className="text-center text-4xl font-bold text-blue-800 mb-6 mt-4">
            Welcome Back To{" "}
            <span className="text-black text-5xl tracking-wider font-lora ">
              Style Craft
            </span>
          </h1>

          <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">
            Login
          </h2>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2 tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                required
                className="placeholder:text-gray-600 tracking-wider  w-full px-4 py-2 border bg-white bg-opacity-70 backdrop-blur-lg border-gray-400 shadow-lg rounded-lg   text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2 tracking-wide">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                required
                className="placeholder:text-gray-600 tracking-wider w-full px-4 py-2 border bg-white bg-opacity-70 backdrop-blur-lg border-gray-400 shadow-lg rounded-lg   text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
            >
              LogIn
            </button>
          </form>

          {/* Google Sign-In Button */}
          <div className="mt-4">
            <GoogleSignIn setUser={setUser} />
          </div>

          <div className="mt-4 text-center">
            <p className="text-lg font-bold text-black tracking-wide">
              Do not have an account?{" "}
              <a
                href="/"
                className="text-blue-200 font-medium underline tracking-wider text-xl"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
