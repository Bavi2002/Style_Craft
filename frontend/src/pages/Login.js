import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

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

  const saveToken = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiration = decodedToken.exp * 1000; // Convert to milliseconds
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("tokenExpiration", expiration.toString());
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
        const { user, token } = response.data;
        saveToken(token);
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
      style={{ backgroundImage: "url('/assets/images/bg5.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen pt-24 px-4 font-lora">
        <div className="bg-gray-100 bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md sm:w-96 border-gray-400 border-2">
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
              <label className="flex items-center text-gray-700  text-lg font-medium mb-2 tracking-wide">
                <Mail className="w-4 h-4 mr-2" /> Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200  focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-lg pl-4"
              />
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700 mb-2 tracking-wide">
                <Lock className="w-4 h-4 mr-2" />
                Password:
              </label>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                required
                className="w-full px-4 py-3 rounded-xl border border-transparent focus:border-blue-500  focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-lg pl-4"
              />
            </div>
            {errors && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {errors}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center mt-4 w-full">
            <hr className="flex-1 border-gray-400" />
            <span className="mx-4 text-gray-700 font-semibold">
              or continue with
            </span>
            <hr className="flex-1 border-gray-400" />
          </div>

          <div className="mt-4">
            <GoogleSignIn setUser={setUser} />
          </div>

          <div className="mt-4 text-center">
            <p className="mt-8 text-center text-gray-600 text-lg">
              Do not have an account?{" "}
              <a
                href="/"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1 group"
              >
                Register
              </a>
            </p>
          </div>
        </div>
        <div className="absolute -z-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob top-0 right-4"></div>
        <div className="absolute -z-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000 bottom-8 left-8"></div>
      </div>
    </div>
  );
};

export default Login;
