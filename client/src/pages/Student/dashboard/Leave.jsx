import React, { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "react-autocomplete";
import { FaGraduationCap, FaUsersViewfinder } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../../redux/actions/userAction";
import MetaData from "../../../layout/MetaData";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { BsType } from "react-icons/bs";

const Leave = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const { loading, teachers, error } = useSelector((state) => state.teachers);
  const [leaveData, setLeaveData] = useState({
    sendto: "",
    userId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Set userId in the state if auth.user exists
  useEffect(() => {
    if (loggedIn) {
      console.log(auth.user);
    }
    if (auth.user) {
      setLeaveData((prevData) => ({
        ...prevData,
        userId: auth.user._id,
      }));
    }
  }, [auth.user]); // Run this effect whenever auth.user changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/request-for-leave", leaveData);
      toast.success("Leave Send Successfully!");
      // Reset form after successful submission
      setLeaveData({
        sendto: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      navigate("/student/leaves");
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Error submitting leave. Please try again later.");
    }
  };

  return (
    <div className="flex w-full ">
      <MetaData title={`Student Leave Request`} />
      <Sidebar />
      <div className="p-7  w-full">
        <main className="">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <p className="text-2xl font-bold  uppercase">Request For Leave</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto lg:py-24   xs:p-5 bg-white h-auto"
          >
            <div className="flex flex-wrap ">
              <div className="mt-3 mb-3 px-3 rounded-lg flex-grow lg:w-1/2">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Leave to :
                </label>
                <div className="flex items-center">
                  <i className="border p-2.5">
                    <FaChalkboardTeacher className="text-xl" />
                  </i>
                  <select
                    name="sendto"
                    id="sendto"
                    value={leaveData.sendto}
                    onChange={handleChange}
                    className="ml-1 rounded-lg outline-none border-indigo-800 w-full"
                  >
                    <option value="">Instructor</option>
                    {teachers
                      ? teachers.map((teacher) => (
                        <option
                          key={teacher._id}
                          value={teacher._id}
                          className="p-4"
                        >
                          {teacher.first_name} {teacher.last_name}
                        </option>
                      ))
                      : "No Teacher Found!!"}
                  </select>
                </div>
              </div>
              <div className="mt-3 mb-3 px-3 rounded-lg flex-grow lg:w-1/2">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2"
                >
                  leave Type :
                </label>
                <div className="flex items-center">
                  <i className="border p-2.5">
                    <BsType className="text-xl" />
                  </i>

                  <select
                    value={leaveData.leaveType}
                    name="leaveType"
                    className="ml-1 rounded-lg outline-none border-indigo-800 w-full"
                    onChange={handleChange}
                    id="leaveType"
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Annual Leave (or Vacation Leave)">
                      Annual Leave (or Vacation Leave)
                    </option>
                    <option value="Bereavement Leave">Bereavement Leave</option>
                    <option value="Study Leave">Study Leave</option>
                    <option value="Sabbatical Leave">Sabbatical Leave</option>
                    <option value="Public Holidays">Public Holidays</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                  </select>
                </div>
              </div>
              </div>
              <div className="flex flex-wrap  ">
                <div className="mt-3 mb-3 px-3  rounded-lg flex-grow lg:w-1/2">
                  <label
                    htmlFor=""
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Starting From :
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <FaUsersViewfinder className="text-xl" />
                    </i>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="w-full"
                      onChange={handleChange}
                      value={leaveData.startDate}
                    />
                  </div>
                </div>
                <div className="mt-3 mb-3 px-3 rounded-lg flex-grow lg:w-1/2">
                  <label
                    htmlFor="leaveType"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Ending From :
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <FaUsersViewfinder className="text-xl" />
                    </i>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full"
                      id="endDate"
                      value={leaveData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-3 mb-3 px-3 rounded-lg flex-grow lg:w-full">
                  <label
                    htmlFor="leaveType"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Reason :
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <FaUsersViewfinder className="text-xl" />
                    </i>
                    <ReactQuill
                      className="border border-gray-300 p-2 rounded-lg w-full"
                      style={{ minHeight: "100px" }}
                      value={leaveData.reason}
                      onChange={(value) =>
                        setLeaveData({ ...leaveData, reason: value })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="text-white ml-4 border  p-3  font-medium hover:rounded-lg bg-indigo-600 hover:text-indigo-600 hover:bg-transparent duration-500"
              >
                Send Leave
              </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Leave;
