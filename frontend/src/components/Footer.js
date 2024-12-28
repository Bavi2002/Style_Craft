require("@fortawesome/fontawesome-free/css/all.min.css");

function Footer() {
  return (
    <footer className="bg-black text-white py-10 font-lora">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
   
    <div className="space-y-4">
      <h1 className="text-3xl font-bold  text-green-500">Style Craft</h1>
      <p className="text-sm leading-relaxed text-gray-400">
        At Style Craft, we specialize in creating custom clothing tailored to your unique style and needs. 
        Quality and craftsmanship are at the heart of what we do.
      </p>
    </div>

  
    <div className="space-y-4">
      <h2 className="text-lg font-bold scale-110  text-green-500">Location</h2>
      <address className="text-sm not-italic text-gray-300">
        New Kandy Road,
        <br />
        Malabe,
        <br />
        Colombo
      </address>
      <p className="text-sm text-gray-400">Phone: +94 123 456 789</p>
    </div>

   
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-green-500">Quick Links</h2>
      <ul className="text-sm text-gray-300 space-y-2">
        <li className="transform hover:scale-110 transition-transform duration-300">
        <a href="#">Home</a>
        </li>
        <li  className="transform hover:scale-110 transition-transform duration-300">
          <a href="#">Contact</a>
        </li>
        <li  className="transform hover:scale-110 transition-transform duration-300">
          <a href="#">Privacy Policy</a>
        </li>
        <li  className="transform hover:scale-110 transition-transform duration-300">
          <a href="#">About</a>
        </li>
      </ul>
    </div>

    <div className="space-y-4">
      <h2 className="text-lg font-bold  text-green-500">Connect with Us</h2>
      <p className="text-sm text-gray-400">Follow us on social media for the latest updates and offers:</p>
      <ul className="flex space-x-4 text-2xl">
        <li className="transform hover:scale-110 transition-transform duration-300">
          <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li className="transform hover:scale-110 transition-transform duration-300">
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition duration-300">
            <i className="fab fa-facebook"></i>
          </a>
        </li>
        <li className="transform hover:scale-110 transition-transform duration-300">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="transform hover:scale-110 transition-transform duration-300">
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition duration-300">
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
    <p>&copy; {new Date().getFullYear()} Style Craft. All rights reserved.</p>
    <p>
      Designed by <a href="#" className=" text-white text-base font-bold tracking-widest">Bavithran</a>.
    </p>
  </div>
</footer>

  );
}

export default Footer;
