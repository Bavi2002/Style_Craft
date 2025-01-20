import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/ProductCard";

const Home = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please Enter the Valid Email Address");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something Went Wrong Please Try Again Later");
    }
  };
  return (
    <div className="font-lora">
      {/* Section 1 */}
      <div
        className="flex flex-wrap justify-between items-center py-16 px-5 sm:px-10 lg:px-20 h-screen bg-gradient-to-t from-blue-500 to-blue-800 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg6.jpg')",
        }}
      >
        <div className="w-full lg:w-1/2 space-y-8 mb-24 text-center lg:text-left pt-24">
          <h1 className="text-3xl sm:text-4xl lg:text-8xl font-extrabold leading-snug">
            Elevate Your Style <br />
            with <span className="text-black">Style Craft</span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-200 w-full lg:w-5/6 leading-relaxed">
            Discover modern, custom-tailored clothing that matches your
            personality. From minimalistic designs to extravagant couture, Style
            Craft redefines your wardrobe with quality craftsmanship.
          </p>

          <div className="space-x-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
            <Link to="/product">
              <button className="bg-white text-blue-900 text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <Link to="/about"> <button className="bg-transparent border-2 border-white text-lg px-6 py-3 rounded-full text-white shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto mt-3 sm:mt-0">
              Learn More
            </button>
            </Link>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
          <svg
            className="absolute w-60 sm:w-[850px] h-60 sm:h-[850px] opacity-90 left-12 mb-8 "
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M54.6,-65.3C68.5,-54.9,73.7,-34.7,74.4,-15.7C75.1,3.3,71.4,21.1,62.7,34.7C54,48.2,40.3,57.4,25.6,63.2C10.9,68.9,-5.8,71.2,-20.4,65.9C-34.9,60.6,-47.2,47.8,-56.4,34.1C-65.7,20.3,-71.9,5.6,-71.8,-9C-71.6,-23.7,-65.1,-37.4,-54.6,-47.8C-44,-58.3,-29.3,-65.6,-13.8,-69.8C1.7,-74,34.6,-75.6,54.6,-65.3Z"
              transform="translate(100 100)"
            />
          </svg>

          <img
            src="/assets/images/rb_54452.png"
            alt="Clothing Store"
            className="relative w-40 sm:w-[950px] h-40 sm:h-[950px] object-contain transform hover:scale-105 transition-transform duration-500 z-10 right-0 sm:right-16"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white py-16 px-5 sm:px-10 lg:px-20 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-8">
          Why Choose <span className="text-secondary">Style Craft</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 justify-items-center">
            <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl mx-auto">
              🎨
            </div>
            <h3 className="text-2xl font-bold">Creative Designs</h3>
            <p className="text-gray-600 w-2/3">
              Unique, modern, and stylish designs crafted with precision and
              care.
            </p>
          </div>

          <div className="space-y-4 justify-items-center">
            <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl mx-auto">
              ✂️
            </div>
            <h3 className="text-2xl font-bold">Tailored Fits</h3>
            <p className="text-gray-600 w-2/3">
              Each piece is custom-made to ensure the perfect fit for every
              customer.
            </p>
          </div>

          <div className="space-y-4 justify-items-center">
            <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl mx-auto">
              🛠️
            </div>
            <h3 className="text-2xl font-bold">High-Quality Materials</h3>
            <p className="text-gray-600 w-2/3">
              Using only the finest materials to ensure durability and comfort.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="py-10 px-5 sm:px-10 lg:px-20 bg-gradient-to-b from-sky-600 via-sky-300 to-gray-100 rounded-3xl">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <h1 className="font-bold text-xl sm:text-4xl text-center text-white w-full sm:w-auto ">
            Top Sales🔥
          </h1>
          <Link to="/product">
          <button className="mt-4 sm:mt-0 bg-black text-white px-4 py-2 rounded-3xl ">
            Shop More
          </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <div className="flex flex-col items-center space-y-4">
                {/* Loading Animation */}
                <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent border-dashed rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-gray-600">
                  Loading products...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-white py-12 px-5 sm:px-10 lg:px-20 text-center mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Subscribe To Our Newsletter
        </h1>
        <p className="mt-3 text-sm sm:text-lg">
          Get the latest updates, news, and exclusive offers directly in your
          inbox.
        </p>
        <div className="flex justify-center mt-6">
          <form
            className="flex flex-wrap gap-3 w-full sm:w-auto"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
              className="w-full sm:w-96 px-3 py-2 border border-gray-300 rounded-xl"
            />
            <button
              type="submit"
              className="w-40 sm:w-auto bg-black text-white px-6 py-2 tracking-wider rounded-xl  shadow-lg transform hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
        {message && (
          <div
            className={`mt-4 text-lg ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
