import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/actions/eventAction";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useThemeProvider } from "../../utils/ThemeContext";

const Events = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { currentTheme, toggleTheme } = useThemeProvider();

  useEffect(() => {
    if (auth.user?.status === "block") {
      navigate("/blocked");
    } else {
      dispatch(fetchEvents());
    }
  }, [auth.user, dispatch, navigate]);

  const { loading, events, error } = useSelector((state) => state.events);

  return (
    <div
      className={`min-h-screen ${
        currentTheme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      } py-10`}
    >
      <h1 className="text-xl mb-2 font-bold">All Events</h1>
      {loading ? (
        <p>Loading..........</p>
      ) : error ? (
        <p>Error Occurred!</p>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="w-full sm:w-1/2 md:w-1/2  lg:w-1/3 px-2 mb-4 "
            >
              <div
                className={`max-w-sm rounded overflow-hidden shadow-lg ${
                  currentTheme === "dark" ? "bg-gray-800 border border-white-800" : ""
                }`}
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{event.title}</div>
                  <p
                    className={`text-base ${
                      currentTheme === "dark"
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    <b>Location:</b> {event.location}
                  </p>
                </div>
                {/* Rest of your component */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
