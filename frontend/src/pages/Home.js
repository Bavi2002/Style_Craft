function Home() {
  return (
    <div className="font-lora w-full bg-gradient-to-br from-primary to-gray-100 rounded-t-3xl text-black">
      {/* Section 1 */}
      <div className="flex flex-wrap justify-between items-center py-16 px-10 lg:px-20">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-[55px] font-extrabold tracking-wider text-secondary">
            Welcome to <span className="text-black text-7xl">Style Craft</span>
          </h1>
          <p className="text-xl text-gray-700 w-5/6 ">
            We specialize in creating bespoke clothing tailored to your unique
            style and needs. Experience the perfect blend of quality,
            creativity, and craftsmanship.
          </p>
          <button className="bg-secondary text-white text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-500">
            Get Started
          </button>
        </div>

        <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <div className="absolute w-[550px] h-[550px] bg-black rounded-full right-1  opacity-90"></div>

          <img
            src="/assets/images/landing_page_clothe.png"
            alt="Clothing Store"
            className="w-[600px] h-[600px] object-contain transform hover:scale-105 transition-transform duration-500 z-10 mr-32"
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
      <div className="py-10 px-5 lg:px-20 bg-gray-800">
        <div className="flex justify-between items-center mb-10 ">
          <h1 className="font-bold text-4xl tracking-wide text-center text-white w-full sm:w-auto">
            Top Sales🔥
          </h1>
          <button className="font-medium tracking-wide text-base bg-white transform hover:scale-105 transition-all duration-300 text-black px-3 py-2 rounded-3xl">
            Shop More
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <img
              src="/assets/images/sample1.jpg"
              alt="Sample Image"
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
              alt="Sample Image"
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
              alt="Sample Image"
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
              alt="Sample Image"
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
      {/* Section 4 */}
      <div className="bg-white py-12 px-5 lg:px-20 text-center mx-auto">
  <h1 className="font-semibold text-3xl">Subscribe To Our Newsletter</h1>
  <p className="mt-3 text-lg">
    Get the latest updates, news, and exclusive offers directly in your inbox.
  </p>
  <div className="flex justify-center items-center mt-6">
    <form className="flex gap-3">
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="border border-gray-300 pr-36 py-2 pl-6 rounded-xl"
      />
      <button
        type="submit"
        className="bg-black px-6 py-2 text-white tracking-wider rounded-xl  shadow-lg transform hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Subscribe
      </button>
    </form>
  </div>
</div>

    </div>
  );
}

export default Home;
