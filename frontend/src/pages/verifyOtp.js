import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [errors, setError] = useState("");

  const [resendTimer, setResendTimer] = useState(10);
  const [isResending, setIsResending] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  //Countdown Timer for OTP Resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsResending(false);
    }
  }, [resendTimer]);

  //OTP Resend
  const handleResendOtp = async () => {
    setError("");
    setIsResending(true);
    setResendTimer(30);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/resend-otp",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend OTP");
      setIsResending(false);
    }
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/verify",
        { email, otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed To Verify OTP");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg9.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 pt-12 px-8">
        <div className="bg-white bg-opacity-25 border-gray-300 border backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md sm:w-96">
          <h1 className="text-center text-4xl font-bold text-blue-800 mb-6">
            Verify OTP
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold tracking-wide text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter your OTP"
                className="w-full px-4 py-2 rounded-lg border bg-white bg-opacity-40 placeholder:text-gray-600 placeholder:text-base placeholder:tracking-wide shadow-lg backdrop-blur-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold transform hover:scale-105 transition duration-300"
            >
              Verify
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className={`w-full py-3 rounded-lg font-bold text-white ${
                isResending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 transform hover:scale-105 transition duration-300"
              }`}
            >
              {isResending ? "Resend" : "Resend OTP"}
            </button>
            {isResending && (
              <span className="block mt-2 text-sm text-gray-600">
                Resend in {resendTimer} seconds
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
