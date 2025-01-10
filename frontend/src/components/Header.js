import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = ({ user, setUser, cartItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between font-lora p-3 fixed top-0 w-full bg-opacity-80 backdrop-blur-lg shadow-2xl z-50 text-black">
      <div className="text-5xl ml-3 p-4 font-bold tracking-wider">
        Style Craft
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-10 mr-4 items-center text-xl font-medium tracking-widest">
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/home">Home</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/product">Product</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {user ? (
        <div className="flex items-center space-x-4 mr-9">
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart className="w-8 h-8 text-black" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-16 h-16 rounded-full border-gray-300 border-2"
          />
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-5 py-2 font-medium text-white rounded-3xl text-center tracking-wider text-base transform hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to={"/"}>
          <button className="shadow-lg tracking-wider bg-black px-7 py-3 mr-9 text-white border border-black rounded-3xl transform hover:scale-105 transition-transform duration-300">
            Sign In
          </button>
        </Link>
      )}

      <div className="md:hidden flex items-center mr-4" onClick={toggleMenu}>
        <button className="flex flex-col space-y-2">
          <div className="w-6 h-1 bg-black rounded"></div>
          <div className="w-6 h-1 bg-black rounded"></div>
          <div className="w-6 h-1 bg-black rounded"></div>
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-20 left-0 right-0 bg-white p-5 rounded-b-lg shadow-lg`}
      >
        <ul className="flex flex-col space-y-4 items-center text-xl font-medium">
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/home">Home</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/product">Product</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
