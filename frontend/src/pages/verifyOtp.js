import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [errors, setError] = useState("");

  const [resendTimer, setResendTimer] = useState(10);
  const [isResending, setIsResending] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;


  //Countdown Timer for OTP Resend
  useEffect(() => {
    if (isResending && resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [isResending, resendTimer]);

  //OTP Resend
  const handleResendOtp = async () => {
    setError("");
    setIsResending(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/resend-otp",
          { email }
        );
        if (response.status === 200) {
          console.log(response.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to resend OTP");
      }
    }, 10000);
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
        { email, otp },{ credentials: "include", headers: { "Content-Type": "application/json" } }
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
    <div>
      <h1>Verify Otp</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter OTP</label>
        <input type="text" value={otp} onChange={handleOtpChange} />
        {errors && <p>{errors}</p>}
        <button type="submit">Verify</button>
      </form>

      <button onClick={handleResendOtp} disabled={isResending}>
        Resend
      </button>
      {isResending && <span>OTP Will Be Resend in {resendTimer} Seconds </span>}
    </div>
  );
};

export default VerifyOtp;
