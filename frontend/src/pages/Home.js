import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

const handleEmailChange = (e) => {
  setEmail(e.target.value);
}
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please Enter the Valid Email Address");
      return;
    }

    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message)
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something Went Wrong Please Try Again Later");
    }
  };
  return (
    <div className="font-lora ">
      {/* Section 1 */}
      <div
        className="flex flex-wrap justify-between items-center py-16 px-10 lg:px-20 h-screen bg-gradient-to-t from-blue-500 to-blue-800 text-white"
        style={{
          backgroundImage: "url('/assets/images/bg6.jpg')",
        }}
      >
        <div className="w-full lg:w-1/2 space-y-8 mb-24">
          <h1 className="text-4xl lg:text-8xl font-extrabold leading-snug ">
            Elevate Your Style <br />
            with <span className="text-black">Style Craft</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-200 w-5/6 leading-relaxed">
            Discover modern, custom-tailored clothing that matches your
            personality. From minimalistic designs to extravagant couture, Style
            Craft redefines your wardrobe with quality craftsmanship.
          </p>

          <div className="space-x-4">
            <button className="bg-white ahadow-xl text-blue-900 text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-lg px-6 py-3 rounded-full text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
          {/* Custom Bubble Shape */}
          <svg
            className="absolute w-[850px] h-[850px] opacity-90 left-12 mb-8 shadow-lg"
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
            className="relative w-[950px] h-[950px] object-contain transform hover:scale-105 transition-transform duration-500 z-10 right-16 "
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white py-16 px-10 lg:px-20 text-center">
        <h2 className="text-4xl font-bold text-gray-700 mb-8">
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
      <div className="py-10 px-5 lg:px-20 bg-gradient-to-b from-sky-600 via-sky-300 to-gray-100 rounded-t-3xl">
        <div className="flex justify-between items-center mb-10 ">
          <h1 className="font-bold text-4xl tracking-wide text-center text-white w-full sm:w-auto">
            Top Sales🔥
          </h1>
          <button className="font-medium tracking-wide text-base bg-black  transform hover:scale-105 transition-all duration-300 text-white  px-4 py-3 rounded-3xl">
            Shop More
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <img
              src="/assets/images/sample1.jpg"
              alt="Sample"
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <p className="text-center font-bold text-lg text-gray-800">
                Customized Top for Women
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 font-medium">
                  <span className="font-bold">Price:</span> Rs.2000.00
                </span>
                <span className="text-yellow-500 text-lg">⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <img
              src="/assets/images/sample2.jpg"
              alt="Sample"
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <p className="text-center font-bold text-lg text-gray-800">
                Customized Top for Women
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 font-medium">
                  <span className="font-bold">Price:</span> Rs.2000.00
                </span>
                <span className="text-yellow-500 text-lg">⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <img
              src="/assets/images/sample3.jpg"
              alt="Sample"
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <p className="text-center font-bold text-lg text-gray-800">
                Customized Top for Women
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 font-medium">
                  <span className="font-bold">Price:</span> Rs.2000.00
                </span>
                <span className="text-yellow-500 text-lg">⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <img
              src="/assets/images/sample4.jpg"
              alt="Sample"
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <p className="text-center font-bold text-lg text-gray-800">
                Customized Top for Women
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 font-medium">
                  <span className="font-bold">Price:</span> Rs.2000.00
                </span>
                <span className="text-yellow-500 text-lg">⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-white py-12 px-5 lg:px-20 text-center mx-auto">
        <h1 className="font-semibold text-3xl">Subscribe To Our Newsletter</h1>
        <p className="mt-3 text-lg ">
          Get the latest updates, news, and exclusive offers directly in your
          inbox.
        </p>
        <div className="flex justify-center items-center mt-6">
          <form className="flex gap-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 w-80  py-2 px-3 rounded-xl"
            />
            <button
              type="submit"
              className="bg-black px-6 py-2 text-white tracking-wider rounded-xl  shadow-lg transform hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
        {message && (
  <div
    className={`mt-4 text-lg ${
      message.toLowerCase().includes('success') ? 'text-green-500' : 'text-red-500'
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
