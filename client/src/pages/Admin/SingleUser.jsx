import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../redux/actions/userAction";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link, useParams } from "react-router-dom";
import Male from "../../images/avatar.jpg";
import FM from "../../images/avatarfm.png";
import MetaData from "../../layout/MetaData";
import { useAuth } from "../../context/auth";

const SingleUser = () => {
  const dispatch = useDispatch();
  const [auth , setAuth] = useAuth()
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (auth?.user.status === "block") {
      navigate("/blocked");
    } else {
      dispatch(userDetails(id));
    }
  }, [dispatch, id]);

  const { loading, user, error } = useSelector((state) => state.user);

  return (
    <div>
      <MetaData title={`${user.email}`}></MetaData>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="p-5 bg-gray-100 h-auto flex flex-col items-center">
                {loading ? (
                  <p>Loading........</p>
                ) : error ? (
                  <p>Error Occurred!</p>
                ) : (
                  <div className="w-1/2 h-auto">
                    {user.image ? (
                      <img
                        src={`http://localhost:8080/${user.image}`}
                        alt={user.username}
                        className="w-32 h-32 m-auto rounded-full mb-4"
                      />
                    ) : user.gender === "Male" ? (
                      <img
                        src={Male}
                        alt=""
                        className="rounded-full  border m-auto"
                      />
                    ) : user.gender === "female" ? (
                      <img
                        src={FM}
                        alt=""
                        className="rounded-full  border m-auto"
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDM3hN-VCNh90Pop53o8bQ1L_W8kn4LhZf7Q&s"
                        alt=""
                        className="rounded-full shadow-xl   border border-gray-300 m-auto"
                      />
                    )}
                    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
                      <h1 className="text-xl mt-4 mb-3 text-center font-extrabold">
                        User Profile
                      </h1>
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">ID:</span>
                        <span className="font-extrabold text-gray-500">
                          {user._id}
                        </span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Username:</span>
                        <span>{user.username}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Role:</span>
                        <span>{user.role}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Email:</span>
                        <span className="text-indigo-600 font-semibold cursor-pointer">
                          {user.email}
                        </span>
                      </div>

                      {user.firstName ? (
                        <div className="flex justify-between mb-4">
                          <span className="font-semibold">First Name:</span>
                          <span>user.firstName</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {user.lastName ? (
                        <div className="flex justify-between mb-4">
                          <span className="font-semibold">Last Name:</span>
                          <span>{user.lastName}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Gender:</span>
                        <span>
                          {user.gender ? user.gender : "Not Selected"}
                        </span>
                      </div>
                      {user.address ? (
                        <div className="flex justify-between mb-4">
                          <span className="font-semibold">Address:</span>
                          <span>{user.address}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
