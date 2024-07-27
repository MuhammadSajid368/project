import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeavesByStudent } from "../../../redux/actions/leaveAction";
import { useAuth } from "../../../context/auth";
import MetaData from "../../../layout/MetaData";
import Sidebar from "./Sidebar";
import { fetchTeachers } from "../../../redux/actions/userAction";

const LeavesData = () => {
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { loading, error, leaves } = useSelector((state) => state.leaves);
  const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    if (auth.user && auth.user._id) {
      dispatch(fetchLeavesByStudent(auth.user._id));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const getTeacherNameById = (sendto) => {
    const teacher = teachers.find((teacher) => teacher._id === sendto);
    return teacher
      ? `${teacher.first_name} ${teacher.last_name}`
      : "No Teacher Found!!";
  };

  return (
    <div>
      <div className="flex">
        <MetaData title="Leave Requests" />
        <Sidebar />
        <div className="p-9 flex-1">
          <h1 className="text-2xl font-bold mb-6">My Leaves</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Reason</th>
                    <th className="py-2 px-4 border-b">Start Date</th>
                    <th className="py-2 px-4 border-b">End Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Send to</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves &&
                    leaves.map((leave) => (
                      <tr key={leave._id}>
                        <td className="py-2 px-4 border-b">
                          <div
                            dangerouslySetInnerHTML={{ __html: leave.reason }}
                          ></div>
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(leave.startDate).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {leave.status === "Pending" && (
                            <span className="text-indigo-800 bg-indigo-200 py-1 px-3 rounded-full text-xs">
                              Pending
                            </span>
                          )}
                          {leave.status === "Approved" && (
                            <span className="text-green-800 bg-green-200 py-1 px-3 rounded-full text-xs">
                              Approved
                            </span>
                          )}
                          {leave.status === "Rejected" && (
                            <span className="text-red-800 bg-red-200 py-1 px-3 rounded-full text-xs">
                              Rejected
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {getTeacherNameById(leave.sendto)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeavesData;
