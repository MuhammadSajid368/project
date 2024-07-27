import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UpdatePasswordAdmin = () => {
  const [password, setPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSettingsBtn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("http://localhost:8080/api/v1/change-password", {
        password,
        lastPassword,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        alert("password updated successfully");
        setPassword("");
        setLastPassword("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className=" w-[200px] justify-center">
            <h5 className="text-2xl font-semibold mb-6 text-gray-700 text-center mt-10">
              Settings
            </h5>
          </div>
          <div className="wrapper min-w-60 max-w-xl ml-24 border p-12">
            <form onSubmit={handleSettingsBtn}>
              <div className="input-box">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold text-sm mb-2"
                >
                  Enter Your Last Password:
                </label>
                <input
                  placeholder="Enter your Last Password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                  value={lastPassword}
                  onChange={(e) => setLastPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold text-sm mb-2"
                >
                  Enter Your New Password:
                </label>
                <input
                  placeholder="Enter your New Password"
                  type="password"
                  className="w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn col-12 mt-6 m-auto"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing" : "Change Password"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdatePasswordAdmin;
