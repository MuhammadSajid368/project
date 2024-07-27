import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateLeave = ({ leave }) => {
  const [status, setStatus] = useState(leave.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch("/update-leave-status", {
        leaveId: leave._id,
        status: newStatus,
      });
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <td className="w-24 p-3 text-sm text-gray-700">
      {status === "Pending" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("Approved")}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50"
        >
          Pending
        </Link>
      ) : status === "Approved" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("Rejected")}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
        >
          Approved
        </Link>
      ) :  status === "Rejected" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("Pending")}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
        >
          Rejected
        </Link>
      ) : ""}
    </td>
  );
};

export default UpdateLeave;
