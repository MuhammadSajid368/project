import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaHome } from "react-icons/fa";
import { MdDashboard, MdOutlineRoundaboutRight } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import "./../css/nav.css";
import { useAuth } from "../context/auth";
import { BiLogOut } from "react-icons/bi";
import { useEffect } from "react";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const loggedIn =
    auth.user !== null && auth.token !== null && auth.refreshToken !== null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {});
  const Dashboard = (e) => {
    e.preventDefault();
    if (auth?.user.status === "block") {
      navigate("/blocked");
    } else {
      const role = Array.isArray(auth.user.role)
        ? auth.user.role[0]
        : auth.user.role;
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "staff":
          navigate("/staff/dashboard");
          break;
        case "guests":
          navigate("/guest/dashboard");
          break;
        default:
          console.log("Unknown role:", role);
      }
    }
  };

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
          isSearchOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-full md:max-w-md p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={toggleSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse font-[1000] text-xl uppercase text-indigo-700 "
          >
            Eureka Learning.
          </Link>
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse relative ">
            <button
              type="button"
              onClick={toggleSearch}
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5 rounded-full me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#000"
                  d="M9 3C5.13 3 2 6.13 2 10s3.13 7 7 7c1.54 0 2.95-.5 4.12-1.36l5.86 5.86L21.59 18l-5.84-5.86C15.5 12.95 16 11.54 16 10c0-4.41-3.59-8-8-8zm0 2c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"
                />
              </svg>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-language"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle Menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-language"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <div className="flex items-center">
                  <FaHome className="mr-1 text-lg" />
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-brown bg-blue-700 rounded md:bg-transparent md:text-brown md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }
                  >
                    Home
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <MdOutlineRoundaboutRight className="mr-1 text-lg" />
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-brown bg-blue-700 rounded md:bg-transparent md:text-brown md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }
                  >
                    About
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaGraduationCap className="mr-1 text-lg" />
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-brown bg-blue-700 rounded md:bg-transparent md:text-brown md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }
                  >
                    Courses
                  </NavLink>
                </div>
              </li>
              {!loggedIn && (
                <li>
                  <div className="flex items-center">
                    <IoIosLogIn className="mr-1 text-lg" />
                    <NavLink
                      to="/auth/login"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-brown bg-blue-700 rounded md:bg-transparent md:text-brown md:p-0 md:dark:text-blue-500"
                          : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }
                    >
                      Login
                    </NavLink>
                  </div>
                </li>
              )}
              {loggedIn && (
                <li>
                  <div className="flex items-center">
                    <MdDashboard className="mr-1 text-lg" />
                    <button
                      onClick={Dashboard}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Dashboard
                    </button>
                  </div>
                </li>
              )}
              {loggedIn && (
                <li>
                  <div className="flex items-center">
                    <BiLogOut className="mr-1 text-lg" />
                    <button
                      onClick={logout}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/5 bg-opacity-50 filter blur-md z-40 ${
          isSearchOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};

export default Navbar;
