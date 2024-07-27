import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/actions/studentActions";

const StudentsTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (auth?.user.status === "block") {
      navigate("/blocked");
    } else {
      dispatch(fetchStudents());
    }
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="p-5 bg-gray-100 h-auto ">
              <h1 className="text-xl mb-2">Student Record</h1>
              {loading ? (
                <p>Loading........</p>
              ) : error ? (
                <p>Error Occurred!</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-gray-200">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        #
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Profile Pic
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Name
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
                    {students &&
                      students.map((student) => (
                        <tr key={student._id}>
                          <Link
                            to={student._id}
                            className="w-20 p-3 text-sm text-gray-700 font-bold text-blue-700 hover:underline cursor-pointer "
                          >
                            {student._id}
                          </Link>
                          <td className="p-3 text-sm text-gray-700">
                            <img
                              src={student.profile_pic}
                              alt="student.firstName"
                            />
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            {student.gender}{" "}
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            <span className="w-24 p-1.5  text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                              {student.gpa}{" "}
                            </span>
                          </td>
                          <td className="w-24 p-3 text-sm text-gray-700">
                            <span className="w-24 p-1.5  text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                              {student.yearOfStudy}{" "}
                            </span>
                          </td>
                          <td className="flex p-4 ">
                            <Link to={"#"} className="p-1 text-yellow-900">
                              {" "}
                              <CiEdit />
                            </Link>
                            <Link to={"#"} className="p-1 text-red-600">
                              {" "}
                              <MdDelete />
                            </Link>
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

export default StudentsTable;
