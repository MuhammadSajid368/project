import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/actions/userAction";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../../layout/SekeltonLoading";
import { useThemeProvider } from "../../utils/ThemeContext";

const AllTeachers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentTheme } = useThemeProvider();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const { loading, teachers, error } = useSelector((state) => state.teachers);

  return (
    <div className={`flex h-screen overflow-hidden ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className={`px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ${currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
            <h1 className={`text-xl mb-2 font-bold ${currentTheme === "dark" ? "text-white" : "text-black"}`}>Teacher's Record</h1>
            {loading ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-gray-200">
                  <tr>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      #
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Profile Pic
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Name
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Username
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Role
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(10).fill(0).map((_, index) => (
                    <tr key={index}>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        <SkeletonLoader />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : error ? (
              <p>Error Occurred!</p>
            ) : (
              <table className="w-full">
                <thead >
                  <tr>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      #
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Profile Pic
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Name
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Username
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Role
                    </th>
                    <th className={`p-3 text-sm font-semibold tracking-wide text-left ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers && teachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>{teacher._id}</td>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        <img src={`http://localhost:8080/${teacher.image}`} className="w-12 h-12 rounded-full" alt={teacher.username} />
                      </td>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        {teacher.first_name} {teacher.last_name}
                      </td>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        {teacher.username}
                      </td>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        <span className={`w-24 p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${currentTheme === "dark" ? "text-white bg-yellow-800" : "text-black bg-yellow-200"}`}>
                          {teacher.role}
                        </span>
                      </td>
                      <td className={`p-3 text-sm ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                        <span className={`w-24 p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${currentTheme === "dark" ? "text-white bg-green-800" : "text-black bg-green-200"}`}>
                          {teacher.gender ? teacher.gender : "Not Selected"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllTeachers