import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";

const GoogleSignIn = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get ID token for backend authentication
      const idToken = await user.getIdToken();

      // Send the ID token to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/google-signin",
        { idToken }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/home", { state: { user: response.data.user } });
      } else {
        setError("Failed to authenticate with Google.");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="mt-1 bg-white w-80 text-blue-800 py-3 rounded-lg font-bold flex items-center justify-center shadow-lg border transform hover:scale-105 transition duration-300"
        onClick={handleGoogleSignIn}
      >
        <img
          src="/assets/images/google-icon.png"
          alt="Google Icon"
          className="w-6 h-6 mr-2"
        />
        Sign in with Google
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default GoogleSignIn;
