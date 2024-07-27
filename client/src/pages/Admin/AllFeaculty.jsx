import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaculty, fetchStudents, fetchUsers } from "../../redux/actions/userAction";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDetails } from "react-icons/md";


const AllFeaculty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(fetchFeaculty());
}, [Dispatch]);
  const { loading, staff, error } = useSelector((state) => state.staff);


  console.log(staff);
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
            <div className="d-flex justify-content-center mt-5">
            {/* {resPerPage <= usersCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />)} */}
            </div>
            <div className="p-5 bg-gray-100 h-auto ">
              <h1 className="text-xl mb-2 font-bold">Staff's Record</h1>
              {loading ? (
                <p>
                  loading..........
                </p>
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
                    {staff ?
                      staff.map((user) => (
                        <tr key={user._id}>
                          <Link
                            to={user._id}
                            className="w-20 p-3 text-sm  font-bold text-blue-700 hover:underline cursor-pointer "
                          >
                            {user._id}
                          </Link>
                          <td className="p-3 text-sm text-gray-700">
                            <img src={user.image} alt={user.username} />
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            {user.username}{" "}
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            <span className="w-24 p-1.5  text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                              {user.role}{" "}
                            </span>
                          </td>
                          <td className="w-24 p-3 text-sm text-gray-700">
                            <span className="w-24 p-1.5  text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                              {user.gender ? user.gender : "not Selected"}{" "}
                            </span>
                          </td>
                          <td className="flex p-4 ">
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="p-1 text-red-600"
                            >
                              {" "}
                              <MdDetails />
                            </Link>
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
                      )) : "No Staff Record Found" }
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

export default AllFeaculty;
