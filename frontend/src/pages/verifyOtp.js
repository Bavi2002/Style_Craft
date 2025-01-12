import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Shield, Check, RefreshCw } from "lucide-react";

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
      className="relative min-h-screen bg-cover bg-center font-lora"
      style={{ backgroundImage: "url('/assets/images/bg9.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 pt-12 px-8">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-md sm:w-96 transition-transform transform ">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 mx-auto mt-8">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 mt-5  px-4 mb-5">
            Enter the 6-digit Code Sent to Your Email to Verify Your Account.
          </p>
          <div className="px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between gap-2">
                  <input
                    value={otp}
                    type="text"
                    onChange={handleOtpChange}
                    className="w-full h-12 pl-4 text-xl font-bold rounded-xl border border-gray-200 bg-white/50 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                {errors && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                    {errors}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Verify Code
                <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </div>
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-x-0 h-px bg-gray-300"></div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Didn't receive the code?
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className={`px-3 py-3 w-full mx-7 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isResending
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              }`}
            >
              <RefreshCw
                className={`w-5 h-5 ${isResending ? "animate-spin" : ""}`}
              />
              {isResending ? `Resend in ${resendTimer}s` : "Resend Code"}
            </button>
          </div>

          <footer className="text-xs text-gray-400 mt-8 mb-4">
            Need help?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Contact Support
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
