function Home() {
  return (
    <div className="font-lora w-full bg-primary rounded-t-3xl flex flex-wrap justify-between items-center py-10 px-5 text-black">

  <div className="p-5">
    <div className="font-extrabold tracking-widest text-5xl">
      Welcome to Style Craft
    </div>
    <p className="w-4/6 mt-5 text-xl">
      We specialize in creating custom clothing tailored to your unique style and needs.
    </p>
    <button className="transform hover:scale-105 transition-transform duration-300 bg-secondary text-lg px-3 py-2 rounded-2xl mt-5 text-white font-bold tracking-wider">
      Get Started
    </button>
  </div>

  <div className="relative w-96 h-96 bg-white rounded-full flex items-center justify-center">
    <img
      src="/assets/images/landing_page_clothe.png"
      alt="Clothing Store"
      className="mr-80"
    />
  </div>
</div>

  );
}
export default Home;
