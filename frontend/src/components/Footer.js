import { Link } from "react-router-dom";
require("@fortawesome/fontawesome-free/css/all.min.css");


const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10 font-lora">
      <div className="container mx-9 lg:mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
        <div className="space-y-4 w-72">
          <h1 className="text-4xl font-bold text-highlight">Style Craft</h1>
          <p className="text-base leading-relaxed text-gray-400">
            At Style Craft, we specialize in creating custom clothing tailored
            to your unique style and needs. Quality and craftsmanship are at the
            heart of what we do.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold  text-highlight">
            Location
          </h2>
          <address className="text-lg not-italic text-gray-400">
            New Kandy Road,
            <br />
            Malabe,
            <br />
            Colombo
          </address>
          <p className="text-lg text-gray-400">Phone: +94 123 456 789</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-highlight">Quick Links</h2>
          <ul className="text-lg text-gray-400 space-y-2">
            <li className="transform hover:scale-110 transition-transform duration-300">
            <Link to="/home">Home</Link>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
            <Link to="/contact">Contact</Link>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
            <Link to="/product">Product</Link>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
            <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-highlight">Connect with Us</h2>
          <p className="text-lg text-gray-400">
            Follow us on social media for the latest updates and offers:
          </p>
          <ul className="flex space-x-8 text-2xl">
            <li className="transform hover:scale-110 transition-transform duration-300">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500 transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-500 transition duration-300"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-400 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="transform hover:scale-110 transition-transform duration-300">
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Style Craft. All rights reserved.
        </p>
        <p>
          Designed by{" "}
          <a
            href="#"
            className="text-white text-base font-bold tracking-widest"
          >
            Bavithran
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
