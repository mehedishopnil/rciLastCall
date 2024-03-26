import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.svg";
import {
  IoIosHelpCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FaUserCircle, FaTimes, FaBars, FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { PiSignOutFill } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden lg:flex justify-between items-center navbar">
        {/* Logo and Search Bar */}
        <div className="navbar-start flex items-center justify-between">
          <Link to="/"> <img src={logo} alt="Logo" className="w-12 h-12" /> </Link>
          <div className="w-[1px] h-14 bg-white"></div>
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="w-[80px] "
            />


          {/* Search bar visible only on lg screens */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded-full bg-gray-200 ml-4"
            />
          </div>
          
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-white">
            
            <li>
              <Link to="/lastCallVacation"><p className="text-xl">BOOK</p></Link>
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
        <div className="navbar-end text-white flex gap-5 items-center">
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
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="w-[80px] "
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="dropdown relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="h-8 w-8 text-xl text-white" />
              ) : (
                <FaBars className="h-8 w-8 text-xl text-white" />
              )}
            </div>
            {isMenuOpen && (
              <div className=" p-5">
                <ul className="absolute right-0 menu menu-lg dropdown-content mt-5  p-2 shadow bg-white rounded-box w-screen z-10 h-fit flex flex-col ">
                  <div>
                    <Link to="/lastCallVacation">
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <img
                            src="https://www.rci.com/static/images/content/icons-header/book.svg"
                            alt=""
                          />
                          <a>BOOK</a>
                        </div>
                      </li>
                    </Link>

                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <img
                          src="https://www.rci.com/static/images/content/icons-header/trips.svg"
                          alt=""
                        />
                        <a>TRIPS</a>
                      </div>
                    </li>

                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <img
                          src="https://www.rci.com/static/images/content/icons-header/offers.svg"
                          alt=""
                        />
                        <a>DEALS</a>
                      </div>
                    </li>

                    <Link to="/">
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <IoHomeOutline className="text-2xl" />
                          <a>Home</a>
                        </div>
                      </li>
                    </Link>
                  </div>

                  <div className="flex justify-center">
                    <span className="w-11/12 h-[1px]  bg-slate-400"></span>
                  </div>

                  <div>
                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <IoMdNotificationsOutline className="text-3xl" />
                        <a>Notifications</a>
                      </div>
                    </li>

                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <FaRegUserCircle className="text-2xl" />
                        <a>My Account</a>
                      </div>
                    </li>

                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <FaRegHeart className="text-2xl" />
                        <a>My Favorites</a>
                      </div>
                    </li>

                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <IoIosHelpCircleOutline className="text-2xl" />
                        <a>Help</a>
                      </div>
                    </li>
                    <li className="flex font-regular text-gray-600">
                      <div className="">
                        <PiSignOutFill className="text-2xl" />
                        <a>Sign Out</a>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            )}
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
