import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../redux/actions/userAction";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDetails } from "react-icons/md";
import { SkeletonLoader } from "../../layout/SekeltonLoading";
import { toast } from "react-toastify";
import UserStatus from "./UserStatus";
import { useThemeProvider } from "../../utils/ThemeContext";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentTheme } = useThemeProvider();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { loading, users, error, usersCount, resPerPage } = useSelector(
    (state) => state.users
  );

  const handleDelete = (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(userId));
        window.location.reload();
        toast.success("User deleted successfully");
      }
    } catch (error) {}
  };

  return (
    <div
      className={`flex h-screen ${
        currentTheme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      } overflow-hidden`}
    >
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
            <div
              className={` ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } h-auto`}
            >
              <h1
                className={`text-xl font-bold ${
                  currentTheme === "dark" ? "text-white" : "text-black"
                }`}
              >
                User Record
              </h1>
              {loading ? (
                <table className="w-full">
                  <thead className="">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        #
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Profile Pic
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Username
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Role
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Gender
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <SkeletonLoader key={index} />
                      ))}
                  </tbody>
                </table>
              ) : error ? (
                <p>Error Occurred!</p>
              ) : (
                <table className="w-full">
                  <thead className="">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        #
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Profile Pic
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Username
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Role
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Gender
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Status
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user) => (
                        <tr key={user._id}>
                          <td
                            className={`p-3 text-sm ${
                              currentTheme === "dark"
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {user._id}
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            <img
                              src={`http://localhost:8080/${user.image}`}
                              className="w-12 h-12 rounded-full"
                              alt={user.username}
                            />
                          </td>
                          <td
                            className={`p-3 text-sm ${
                              currentTheme === "dark"
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {user.username}
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            <span
                              className={`w-24 p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg  bg-opacity-50 ${
                                user.role === "student"
                                  ? `text-gray-800 bg-gray-200 ${
                                      currentTheme === "dark"
                                        ? "text-gray-200 bg-gray-700"
                                        : ""
                                    }`
                                  : user.role === "staff"
                                  ? `text-lime-800 bg-lime-200 ${
                                      currentTheme === "dark"
                                        ? "text-lime-200 bg-lime-700"
                                        : ""
                                    }`
                                  : `text-pink-800 bg-pink-200 ${
                                      currentTheme === "dark"
                                        ? "text-pink-200 bg-pink-700"
                                        : ""
                                    }`
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="w-24 p-3 text-sm text-gray-700">
                            <span
                              className={`w-24 p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                                user.gender === "male"
                                  ? `text-blue-800 bg-blue-200 ${
                                      currentTheme === "dark"
                                        ? "text-blue-200 bg-blue-700"
                                        : ""
                                    }`
                                  : user.gender === "female"
                                  ? `text-red-800 bg-red-200 ${
                                      currentTheme === "dark"
                                        ? "text-red-200 bg-red-700"
                                        : ""
                                    }`
                                  : `text-pink-800 bg-pink-200 ${
                                      currentTheme === "dark"
                                        ? "text-pink-200 bg-pink-700"
                                        : ""
                                    }`
                              }`}
                            >
                              {user.gender ? user.gender : "Not Selected"}
                            </span>
                          </td>
                          <UserStatus user={user} />
                          <td className="flex p-4">
                            <Link
                              to={`/admin/user/${user._id}`}
                              target="_blank"
                              className={`p-1 text-red-600 ${
                                currentTheme === "dark"
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              <MdDetails />
                            </Link>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className={`p-1 text-red-600 ${
                                currentTheme === "dark"
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllUsers;
