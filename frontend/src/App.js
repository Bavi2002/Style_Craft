import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwtToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Register setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/product" element={<Product user={user} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
