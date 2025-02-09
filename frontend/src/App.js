import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetails";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Order";
import UserProfile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
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
        <ToastContainer position="top-center" theme="dark" />
        <Header
          user={user}
          setUser={setUser}
          cartItemsCount={cartItems.length}
        />
        <Routes>
          <Route path="/" element={<Register setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/cart"
            element={
              <Cart
                user={user}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
                <Route
            path="/order"
            element={
              <Checkout
                user={user}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route path="/products/:id" element={<ProductDetail user={user} />} />
          <Route path="/profile" element={<UserProfile setUser={setUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
