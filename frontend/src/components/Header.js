import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between font-lora p-3 fixed top-0 w-full bg-white shadow-lg z-50  bg-opacity-60 backdrop-blur-3xl ">
      <div className="text-5xl ml-3 p-4 font-bold tracking-wider">
        Style Craft
      </div>
      <nav>
        <ul className="flex space-x-10 mr-4 items-center text-xl font-medium tracking-widest">
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <a href="/home">Home</a>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <a href="#">Product</a>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <a href="#">About Us</a>
          </li>
          <li className="px-2 py-1 transform hover:scale-110 transition-transform duration-300">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      {user ? (
        <div className="flex items-center space-x-4 mr-9">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-16 h-16 rounded-full border-gray-300  border-2"
          />
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-5 py-2 font-medium text-white rounded-lg tracking-wider text-base transform hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to={"/"}>
          <button className="bg-secondary px-7 py-3 mr-9 text-white bord rounded-3xl tracking-wider transform hover:scale-105 transition-transform duration-300">
            Sign In
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
