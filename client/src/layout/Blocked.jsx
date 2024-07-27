import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Blocked = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <nav className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse font-bold text-2xl text-indigo-700 dark:text-indigo-300"
          >
            Eureka Learning.
          </Link>
          <div className="relative flex items-center space-x-3">
            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50"
                id="user-dropdown"
              >
                <ul className="py-2">
                  <li>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <button
              type="button"
              className="md:hidden p-2 w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
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
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Account Blocked</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Oops, sorry! Your account has been blocked due to violations of our terms of service. If you believe this is a mistake, please contact our support team.</p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blocked;
