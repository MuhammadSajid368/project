import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import { fetchLeavesByTeacher } from "../../../redux/actions/leaveAction";
import { fetchStudents } from "../../../redux/actions/userAction";
import MetaData from "../../../layout/MetaData";
import Sidebar from "./Sidebar";
import UpdateLeave from "./UpdateLeave";
import { SkeletonLoader } from "../../../layout/SekeltonLoading";



const LeaveRequests = () => {
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { loading, error, leaves } = useSelector((state) => state.leaves);
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    if (auth.user && auth.user._id) {
      dispatch(fetchLeavesByTeacher(auth.user._id));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const getStudentNameById = (userId) => {
    const student = students.find((student) => student._id === userId);
    return student
      ? `${student.first_name} ${student.last_name}`
      : "Student not Exists";
  };

  return (
    <div className="flex">
      <MetaData title="Leave Requests" />
      <Sidebar />
      <div className="p-9">
        <h1 className="text-2xl font-bold mb-6">My Leaves</h1>
        {loading ? (
          <p>Loadifsjl</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaves &&
              leaves.map((leave) => (
                <div
                  key={leave._id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                 <div className="text-lg"
                            dangerouslySetInnerHTML={{ __html: leave.reason }}
                          ></div>
                  <p className="text-gray-700 mb-1">
                    <span className="font-bold">Start Date:</span>{" "}
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-bold">End Date:</span>{" "}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center font-bold">Status : <UpdateLeave leave={leave} /></p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-bold">Send By:</span>{" "}
                    {getStudentNameById(leave.userId)}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
