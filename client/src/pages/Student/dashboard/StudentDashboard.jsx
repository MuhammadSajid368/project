import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MetaData from "../../../layout/MetaData";
import { useAuth } from "../../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiBook, BiCalendarEvent } from "react-icons/bi";

const StudentDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    if (!auth.user) {
      toast.success("You are not allowed to access this page");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    }
  }, [auth, navigate]);

  return (
    <div className="flex w-full h-auto">
      <MetaData title={`Student Dashboard`} />
      <Sidebar />
      <div className="w-full">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="text-indigo-800 origin-left font-extrabold text-xl ml-1 mt-1 uppercase transition-transform duration-500"
            >
              Eureka Learning
            </Link>
            <div className="flex items-center md:order-2 relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={`http://localhost:8080/${auth.user.image}`}
                  alt="user photo"
                />
              </button>
              {dropdownVisible && (
                <div
                  className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {auth.user.first_name} {auth.user.last_name}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {auth.user.email}
                    </span>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="p-4">
          <p className="font-semibold text-2xl mt-6 ml-4">
            Hi, <b className="font-extrabold">{auth.user ? auth.user.first_name : "Guest"}</b>! Welcome to our Site
          </p>
          <div className="flex justify-center mt-10 space-x-7">
            <div className="w-30 h-40 bg-indigo-500 text-white rounded-lg p-3 flex items-center justify-center">
              <BiCalendarEvent className="text-2xl mr-2" />
              <Link to="/student/upcoming/events" className="text-2xl  font-semibold">
                Upcoming Events
              </Link>
            </div>
            <div className="w-30 h-40 bg-slate-500 text-white rounded-lg p-5 flex items-center justify-center">
              <BiBook className="text-2xl mr-2" />
              <Link to="" className="text-2xl font-semibold">
                Courses
              </Link>
            </div>
            <div className="w-30 h-40 bg-blue-900 text-white rounded-lg p-5 flex items-center justify-center">
              <BiCalendarEvent className="text-2xl mr-2" />
              <Link to="/student/leaves" className="text-2xl font-semibold">
                Leaves Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
