import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        {errors && <p>{errors}</p>}<button type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default Login;
