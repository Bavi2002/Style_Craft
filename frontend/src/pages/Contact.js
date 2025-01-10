import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      if (response.data.success) {
        setResponseMessage(response.data.message);
        setIsSuccess(true);
      } else {
        setResponseMessage(response.data.message);
        setIsSuccess(false);
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setResponseMessage("An Error Occurred. Please Try Again Later.");
      setIsSuccess(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover flex items-center justify-center px-4 py-8 font-lora "
      style={{
        backgroundImage: "url('/assets/images/bg2.jpg')",
      }}
    >
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-xl mt-28 border-2 border-gray-300 backdrop-blur-lg bg-opacity-80 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center text-center space-y-4">
          <img
            src="/assets/images/contact.png"
            alt="Contact Illustration"
            className="w-80 h-80 object-cover rounded-full shadow-xl transform transition-transform duration-500 hover:scale-105"
          />
          <h2 className="text-4xl font-bold text-blue-700 leading-tight">
            We’d Love to Hear from You!
          </h2>
          <p className="text-gray-600 mt-2 text-lg leading-relaxed">
            Have questions or feedback? Reach out, and we’ll connect with you
            shortly!
          </p>

          <div className="flex items-center justify-between gap-32">
            <a
              href="mailto:stylecraft@gmail.com"
              className="text-blue-900 font-semibold text-lg mt-4 flex items-center  space-x-2 hover:text-blue-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2zM4 6l8 6 8-6"
                />
              </svg>

              <span>stylecraft@gmail.com</span>
            </a>

            <div className="mt-6 flex justify-center space-x-4 text-3xl">
              <a
                href="https://www.facebook.com"
                className="text-blue-600 bg-gray-100 border text-center p-2 px-4 shadow-xl rounded-lg hover:text-blue-800 transition-colors   20021"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://wa.me/yourphonenumber"
                className="text-green-600 bg-gray-100 border text-center p-2 px-4 shadow-xl rounded-lg hover:text-green-800 transition-colors"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="https://www.instagram.com"
                className="text-pink-600 bg-gray-100 border text-center p-2 px-4 shadow-xl rounded-lg hover:text-pink-800 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 sm:p-10 bg-gradient-to-b from-blue-50 to-white shadow-inner">
          <h3 className="text-4xl font-bold text-blue-900 mb-6 text-center">
            Get in Touch
          </h3>

          {responseMessage && (
            <div
              className={`mb-6 text-center px-4 py-3 rounded-lg shadow-md ${
                isSuccess
                  ? "bg-green-50 text-green-800 border border-green-300"
                  : "bg-red-50 text-red-800 border border-red-300"
              }`}
            >
              {responseMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-blue-800 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition shadow-sm"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-blue-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition shadow-sm"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-base font-medium text-blue-800 mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                onChange={handleChange}
                value={formData.message}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition shadow-sm"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-transform shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
