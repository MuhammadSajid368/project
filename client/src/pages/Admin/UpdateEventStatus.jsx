import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateEventStatus = ({ event }) => {
  const [status, setStatus] = useState(event.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch("/event/update-event-status", {
        eventId: event._id,
        status: newStatus,
      });
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <td className="w-24 p-3 text-sm text-gray-700">
      {status == "upcoming" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("expired")  && window.location.reload()}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-800 bg-indigo-200 rounded-lg bg-opacity-50"
        >
          Upcoming
        </Link>
      ) : status === "expired" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("cancelled") && window.location.reload()}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
        >
          Expired
        </Link>
      ) : status === "cancelled" ? (
        <Link
          to="#"
          onClick={() => handleStatusUpdate("upcoming")  && window.location.reload()}
          className="w-24 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
        >
          Cancelled
        </Link>
      ) : (
        ""
      )}
    </td>
  );
};

export default UpdateEventStatus;
