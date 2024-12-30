const Header = () => {
  return (
    <header className="flex items-center justify-between font-lora m-4">
      <div className="text-5xl ml-3 p-4 font-bold tracking-wider">Style Craft</div>
      <nav>
        <ul className="flex space-x-10 mr-4 items-center text-xl font-medium tracking-widest">
          <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300">
            <a href="#">Home</a>
          </li>
          <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300">
            <a href="#">Product</a>
          </li>
          <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300">
            <a href="#">About Us</a>
          </li>
          <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300 ">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      <button className="bg-secondary px-7 py-3 mr-9 text-white bord rounded-3xl tracking-wider transform hover:scale-105 transition-transform duration-300 ">
        Sign In
      </button>
    </header>
  );
}
export default Header;
