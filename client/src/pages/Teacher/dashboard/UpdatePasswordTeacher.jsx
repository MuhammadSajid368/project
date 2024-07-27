// Settings.js

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";

const UpdateTeacher = () => {
  const [password, setPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSettingsBtn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/change-password", {
        password,
        lastPassword,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        alert("password updated successfully");
        setPassword("")
        setLastPassword("")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-white mt-24 align-middle m-auto w-max">
        <div className="bg-white shadow-lg rounded-lg p-8 min-w-[400px]">
          <div>
            <h5 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Settings
            </h5>
          </div>
          <div className="wrapper">
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
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;
