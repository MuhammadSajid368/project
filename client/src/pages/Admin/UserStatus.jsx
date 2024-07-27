import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserStatus = ({ user }) => {
  const [status, setStatus] = useState(user.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch("/update-status", {
        userId: user._id,
        status: newStatus,
      });
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <td className="w-24 p-3 text-sm text-gray-700">
      {status === "active" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("block")}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
        >
          Active
        </Link>
      ) : status === "block" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("active")}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
        >
          Block
        </Link>
      ) : (
        ""
      )}
    </td>
  );
};

export default UserStatus;
