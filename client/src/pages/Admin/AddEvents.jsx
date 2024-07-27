import React, { useState, useEffect, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import axios from 'axios';
import { useThemeProvider } from "../../utils/ThemeContext";

const Calendar = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [EventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    organizer: "",
    image: null,
  });
  const { currentTheme } = useThemeProvider();

  const handleChange = (e) => {
    setEventData({ ...EventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...EventData , image : e.target.files[0]})
  }

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in EventData) {
      formData.append(key, EventData[key]);
    }
    try {
      const response = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(response.data);
      alert(response.data.message);
      setEventData({ title: "", description: "", date: "", endDate: "", location: "", organizer: "", image: null, });
    } catch (error) {
      console.error("Error adding course:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      } else {
        alert("Error adding course. Please try again later.");
      }
    }
  };
  
  const handleEventMouseEnter = (info) => {
    setHoveredEvent(info.event);
  };

  const handleEventMouseLeave = () => {
    // Clear the hovered event when mouse leaves the event
    setHoveredEvent(null);
  };

  return (
    <Fragment>
      <div className={`flex h-screen ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} overflow-hidden`}>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="max-w-md mx-auto ">
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  events={EventData} // Pass events data to FullCalendar component
                  eventMouseEnter={handleEventMouseEnter} // Callback for mouse enter event
                  eventMouseLeave={handleEventMouseLeave} // Callback for mouse leave event
                />
                <form onSubmit={handleAddEvent} className={`mt-8 bg-${currentTheme === "dark" ? "gray-800" : "white"} p-4`}>
                  <div className="grid grid-cols-1 gap-6">
                    <input
                      type="text"
                      value={EventData.title}
                      onChange={handleChange}
                      placeholder="Event Title"
                      name="title"
                      required
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />

                    <input
                      type="datetime-local"
                      value={EventData.date}
                      name="date"
                      onChange={handleChange}
                      required
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />
                    <input
                      type="datetime-local"
                      value={EventData.endDate}
                      name="endDate"
                      required
                      onChange={handleChange}
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />
                    <textarea
                      value={EventData.description}
                      onChange={handleChange}
                      placeholder="Event Description"
                      name="description"
                      required
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />
                    <input
                      type="text"
                      value={EventData.location}
                      onChange={handleChange}
                      name="location"
                      placeholder="Event Location"
                      required
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />
                    <input
                      type="file"
                      name="image"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10 ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                    <input
                      type="text"
                      value={EventData.organizer}
                      onChange={handleChange}
                      placeholder="Event Organizer"
                      required
                      name="organizer"
                      className={`input ${currentTheme === "dark" ? "text-white bg-gray-800" : "text-black bg-gray-200"}`}
                    />
                    <button
                      type="submit"
                      className={`btn ${currentTheme === "dark" ? "bg-blue-800 hover:bg-blue-900" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    >
                      Add Event
                    </button>
                  </div>
                </form>
                {hoveredEvent && (
                  <div className="absolute top-0 left-0 bg-white shadow p-2">
                    <p>Title: {hoveredEvent.title}</p>
                    <p>Date/Time: {hoveredEvent.start.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Calendar;
