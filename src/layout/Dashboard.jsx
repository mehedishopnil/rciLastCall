import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaHome, FaWpforms } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoMdClose } from "react-icons/io"; // Import close icon
import logo from "../assets/Images/logo.svg";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar for LG screens */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 bg-slate-200 h-screen">
        <ul className="menu p-4 text-gray-700 font-bold text-lg">
          <li>
            <Link to="overview">
              <HiOutlineHomeModern /> Overview
            </Link>
          </li>
          <li>
            <Link to="resort-input-form">Resort Input Form</Link>
          </li>
          <li>
            <Link to="available-date-input">Available Date Input</Link>
          </li>
        </ul>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed top-0 w-full bg-gray-800 text-white p-4 z-50">
        {/* Dashboard header Section */}
        <div className="flex items-center justify-between ">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </Link>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleMobileMenu} className=" text-xl">
            <BsFillMenuButtonWideFill />
          </button>
        </div>

        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div className="bg-gray-200 p-4 absolute top-0 left-0 right-0 mt-12 z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold"></h2>
              <button onClick={toggleMobileMenu} className="text-2xl text-gray-700">
                <IoMdClose />
              </button>
            </div>
            <ul className="menu text-gray-700 font-bold text-xl">
              <li>
                <button onClick={() => handleMenuItemClick("/dashboard/overview")}>
                  <HiOutlineHomeModern /> Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/dashboard/resort-input-form")}>
                  <FaWpforms /> Resort Input Form
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/dashboard/available-date-input")}>
                  <MdDateRange /> Available Date Input
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/")}>
                  <FaHome /> Home
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      {/* Content area */}
      <div className="lg:flex-grow mt-16 lg:mt-0">
        {/* Page content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
