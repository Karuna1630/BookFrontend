import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import profileImg from "../assets/profileavatar.png";
import { useSelector } from "react-redux";

const Navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
  { name: "About Us", href: "/AboutUS" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const currentuser = false;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-3 shadow-lg bg-white sticky top-0 z-50 border-b">
      <nav className="flex justify-between items-center px-3">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-200 rounded-lg transition duration-300">
            <HiMiniBars3CenterLeft className="size-6 text-gray-700" />
          </Link>

          {/* Search Input */}
          <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full w-80 focus-within:ring-2 ring-blue-500 shadow-sm transition duration-300">
            <IoSearchSharp className="text-xl" />
            <input
              type="text"
              placeholder="Search for books..."
              className="bg-transparent outline-none px-3 w-full text-gray-600"
            />
          </div>
        </div>

        {/* Right Side - Navigation Items */}
        <div className="flex gap-4 items-center text-gray-700">
          {/* Profile or Login Icon */}
          <div>
            {currentuser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropdownOpen)}>
                  <img
                    src={profileImg}
                    alt="profile"
                    className="size-6 rounded-full border-2 ring-2 ring-blue-500"
                  />
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-20 mt-4 w-48 bg-white shadow-lg rounded-md z-40 border border-gray-200">
                    <ul className="py-2" onClick={() => setIsDropDownOpen(false)}>
                      {Navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-100 transition duration-300"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-500 transition duration-300">
                <FaRegUser className="text-xl" />
              </Link>
            )}
          </div>

          {/* Wishlist Icon */}
          <button className="hidden sm:block hover:text-red-500 transition duration-300">
            <FiHeart className="text-2xl" />
          </button>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-blue-500 transition duration-300">
            <HiOutlineShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login & Register Buttons - Same Size */}
          <div className="flex gap-2">
            <Link
              to="/login"
              className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:scale-105 transition duration-300 text-sm font-medium shadow-md w-24 text-center"
            >
              Login
            </Link>

            <Link
              to="/register"
             className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:scale-105 transition duration-300 text-sm font-medium shadow-md w-24 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
