import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComingEvents } from "../../redux/actions/eventAction";
import { useThemeProvider } from "../../utils/ThemeContext";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

const Upcoming = ({ auth }) => { // Assuming auth is passed as a prop
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTheme, toggleTheme } = useThemeProvider();

  useEffect(() => {
    if (auth?.user.status === "block") {
      navigate("/blocked");
    } else {
      dispatch(fetchComingEvents());
    }
  }, [dispatch, auth, navigate]);

  const events = useSelector((state) => state.events);

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} py-10`}>
      <button
        onClick={toggleTheme}
        className={`mb-4 px-4 py-2 rounded ${currentTheme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
      >
        Toggle {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <h1 className="text-xl mb-2 font-bold">All Events</h1>
      <div className="flex flex-wrap">
        {events.map((event) => (
          <div key={event.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className={`max-w-sm rounded overflow-hidden shadow-lg ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Uncomment this line if you want to show event image */}
              {/* <img className="w-96 h-24" src={event.image.url} alt="Event Image" /> */}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{event.title}</div>
                <p className="text-base">
                  <b>Location:</b> {event.location}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {event.status === "upcoming" ? (
                  <div className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                    UPCOMING
                  </div>
                ) : event.status === "cancelled" ? (
                  <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">
                    CANCELLED
                  </span>
                ) : (
                  <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                    LIVE
                  </span>
                )}
              </div>
              <div className="px-6 py-4 bg-gray-100 flex justify-between items-center">
                <div className="text-sm">
                  <svg className="w-4 h-4 inline-block mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 9.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 13.586l4.293-4.293a1 1 0 011.414 0z" />
                  </svg>
                  {event.date}
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
