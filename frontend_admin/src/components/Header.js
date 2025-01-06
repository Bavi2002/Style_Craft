import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 h-full bg-opacity-80 backdrop-blur-lg shadow-2xl z-50 w-80 md:w-60 bg-white text-black font-lora">
      <div className="flex flex-col items-center p-5">
        <div className="text-5xl font-bold tracking-wider mb-10">
          Style <br />
          Craft
        </div>

        <nav className="flex flex-col space-y-8 items-center text-xl font-medium tracking-widest">
          <a
            href="/add"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            Add Products
          </a>
          <a
            href="/product"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            View Product
          </a>
          <a
            href="#"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            Users
          </a>
          <a
            href="#"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            Subscription
          </a>
          <a
            href="#"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            Payment
          </a>
          <a
            href="#"
            className="w-full text-center px-4 py-2 transform hover:scale-110 transition-transform duration-300"
          >
            Orders
          </a>
        </nav>

        <div className="mt-10">
          {user ? (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="w-16 h-16 rounded-full border-gray-300 border-2"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 px-6 py-2 font-medium text-white rounded-full tracking-wider transform hover:scale-105 transition-transform duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/"}>
              <button className="mt-5 shadow-lg tracking-wider bg-black px-7 py-3 text-white border border-black rounded-full transform hover:scale-105 transition-transform duration-300">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="absolute bottom-5 w-full flex flex-col items-center text-sm">
        <div className="text-lg font-medium tracking-widest">Style Craft</div>
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-xl">©</span>
            <span className="font-medium">All Rights Reserved</span>
          </div>
          <div className="text-base font-bold tracking-widest">Bavithran</div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
