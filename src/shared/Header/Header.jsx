import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden lg:flex justify-between items-center navbar">
        {/* Logo and Search Bar */}
        <div className="navbar-start flex items-center">
          <img src={logo} alt="" className="w-[52px] h-[52px] " />
          {/* Search bar visible only on lg screens */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded bg-gray-200 ml-4"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <details>
                <summary className="text-xl">BOOK</summary>
                <ul className="p-2 text-black">
                  <li>
                    <Link>
                      <a>Last Call Vacations</a>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <p className="text-xl">TRIPS</p>
            </li>
            <li>
              <p className="text-xl">DEALS</p>
            </li>
          </ul>
        </div>

        {/* User Icons */}
        <div className="navbar-end flex gap-5 items-center">
          <IoMdNotificationsOutline className="text-3xl" />
          <FaUserCircle className="text-3xl" />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="">
        <div className="container mx-auto flex lg:hidden justify-between items-center navbar">
          <div className="space-x-4">
            {/* Logo */}
          <img src={logo} alt="" className="w-[52px] h-[52px]" />
            <div className="w-[1px] h-14 bg-white"></div>
          <img src='https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png' alt="" className="w-[80px] " />
          
          </div>

          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-xl text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
            >
              <li>
                <a>BOOK</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>TRIPS</a>
              </li>
              <li>
                <a>DEALS</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Search bar visible only on mobile screens */}
        <div className="container flex justify-center pb-5 mx-auto lg:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="block w-10/12 px-2 py-1 rounded-full bg-gray-200 mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
