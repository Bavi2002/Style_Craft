function Home() {
  return (
    <div className="font-lora w-full bg-gradient-to-br from-primary to-gray-100 rounded-t-3xl text-black">
      {/* Section 1 */}
      <div className="flex flex-wrap justify-between items-center py-16 px-10 lg:px-20">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-6xl font-extrabold tracking-widest text-secondary">
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
      <div>
        <h1>Latest Styels</h1>
        <div>
            
        </div>
      </div>
    </div>
  );
}

export default Home;
