import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const GoogleSignIn = ({ setUser }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!navigator.onLine) {
      toast.error(
        "No internet connection. Please check your network and try again."
      );
      return;
    }
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await axios.post(
        "http://localhost:5000/api/users/google-signin",
        { idToken }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        // Save user data to localStorage
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        //Testing
        console.log(response.data.message);

        setUser(user);
        navigate("/home");
      }
    } catch (error) {
      alert("Error during Google sign-in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="mt-1 bg-white px-3 text-blue-800 py-3 rounded-lg font-bold flex items-center justify-center shadow-lg border transform hover:scale-105 transition duration-300 w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <img
          src="/assets/images/google-icon.png"
          alt="Google Icon"
          className="w-6 h-6 mr-2"
        />
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default GoogleSignIn;
