import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.svg";
import {
  IoIosHelpCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  FaUserCircle,
  FaTimes,
  FaBars,
  FaRegUserCircle,
  FaWpforms,
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import SearchBarMobile from "./SearchBarMobile/SearchBarMobile";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  console.log(user)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden md:px-10 lg:flex justify-between items-center navbar">
        {/* Logo and Search Bar */}
        <div className="navbar-start flex items-center gap-5">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-[1px] h-14 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt=""
            className="w-[80px]"
          />
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/lastCallVacation">
                <p className="text-xl">BOOK</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className="text-xl">TRIPS</p>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <p className="text-xl">Dashboard</p>
              </Link>
            </li>
          </ul>
        </div>

        {/* User Icons */}
        <div className="navbar-end text-white flex gap-5 items-center">
          {user ? (
            <>
              <IoMdNotificationsOutline className="text-3xl" />

              <Link to="/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="text-3xl w-[50px] rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </Link>

              <div>
                <button
                  onClick={signOut}
                  className="bg-white text-gray-700 rounded px-3 py-1"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Registration
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="">
        <div className="container mx-auto flex lg:hidden justify-between items-center navbar">
          <div className="space-x-4">
            {/* Logo */}
            <Link to="/" className="z-20">
              <img src={logo} alt="" className="w-[52px] h-[52px]" />
            </Link>
            <div className="w-[1px] h-14 bg-white"></div>
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="w-[80px]"
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="flex dropdown relative">
            <div className="flex gap-4">
              {user ? (
                <>
                  <Link to="/profile">
                  {user.photoURL?(
                    <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="text-2xl w-[30px] rounded-full"
                  />
                  ) :
                  (
                    <FaRegUserCircle className="text-3xl text-white" />
                  )}
                  </Link>
                  <PiSignOut
                    onClick={signOut}
                    className="text-3xl cursor-pointer text-white"
                  />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white border rounded px-2 py-1 hover:bg-white hover:text-gray-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signupnpm ru"
                    className="text-white border rounded px-2 py-1 hover:bg-white hover:text-gray-500"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
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
              <div className="p-5">
                <ul className="absolute right-0 menu menu-lg dropdown-content mt-5 p-2 shadow bg-white rounded-box w-screen z-10 h-fit flex flex-col">
                  <div>
                    <Link to="/lastCallVacation" onClick={closeMenu}>
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

                    <Link to="/" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <img
                            src="https://www.rci.com/static/images/content/icons-header/trips.svg"
                            alt=""
                          />
                          <a>TRIPS</a>
                        </div>
                      </li>
                    </Link>

                    <Link to="/" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <img
                            src="https://www.rci.com/static/images/content/icons-header/offers.svg"
                            alt=""
                          />
                          <a>DEALS</a>
                        </div>
                      </li>
                    </Link>

                    <Link to="/" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <IoHomeOutline className="text-2xl" />
                          <a>Home</a>
                        </div>
                      </li>
                    </Link>
                  </div>

                  <div className="flex justify-center">
                    <span className="w-11/12 h-[1px] bg-slate-400"></span>
                  </div>

                  <div>
                    <Link to="/dashboard/overview" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <FaWpforms className="text-2xl" />
                          <a>Dashboard</a>
                        </div>
                      </li>
                    </Link>

                    <Link to="/" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <IoMdNotificationsOutline className="text-3xl" />
                          <a>Notifications</a>
                        </div>
                      </li>
                    </Link>

                    <Link to="/myAccount" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <MdAccountBalanceWallet className="text-2xl" />
                          <a>My Account</a>
                        </div>
                      </li>
                    </Link>

                    <Link to="/profile" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <FaRegUserCircle className="text-2xl" />
                          <a>Profile</a>
                        </div>
                      </li>
                    </Link>

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
                        <PiSignOut className="text-2xl" />
                        <a>Sign Out</a>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
        <SearchBarMobile />
      </div>
    </div>
  );
};

export default Header;
