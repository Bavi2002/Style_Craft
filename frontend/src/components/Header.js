function Header() {
  return <header className="flex items-center justify-between font-lora">
    <div className="text-5xl ml-3 p-4 font-bold">Style Craft</div>
    <nav>
            <ul className="flex space-x-12 mr-4 items-center text-xl font-semibold" >
                <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300"><a href="#">Home</a></li>
                <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300"><a href="#">Product</a></li>
                <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300"><a href="#">About Us</a></li>
                <li className=" px-2 py-1  transform hover:scale-110 transition-transform duration-300 "><a href="#">Contact</a></li>
                <li><button className="bg-secondary px-5 py-2 text-white bord rounded-2xl transform hover:scale-105 transition-transform duration-300 ">Sign In</button></li>
            </ul>
            </nav>
  </header>
}
export default Header;
