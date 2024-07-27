import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchComingEvents } from '../../redux/actions/eventAction';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComingEvents());
  }, [dispatch]);

  const { upcomingEvents: events, loading, error } = useSelector((state) => state.events);

  return (
    <div className='p-5'>
      <p className='font-lg mb-5 pl-1 font-bold'>Upcoming Events in <b className='uppercase text-indigo-700 font-xl'>Eureka Learning</b></p>
      {loading ? (
        <p>Loading..........</p>
      ) : error ? (
        <p>Error Occurred!</p>
      ) : (
        <div className='flex flex-wrap -mx-2'>
          {events.map((event) => (
            <div key={event.id} className="w-full sm:w-1/2 md:w-1/2  lg:w-1/4 px-2 mb-4  h-72 shadow-sm ">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-72">
                {/* <img
                  className="w-96 h-24"
                  src={event.image.url}
                  alt="Event Image"
                /> */}
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{event.title}</div>
                  <p className="text-gray-700 text-base">
                    <b>Location:</b> {event.location}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span>
                    {event.status === "upcoming" ? (
                      <div className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">UPCOMING</div>
                    ) : event.status === "cancelled" ? (
                      <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">
                        CANCELLED
                      </span>
                    ) : (
                      <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                        LIVE
                      </span>
                    )}
                  </span>
                </div>
                <div className="px-6 py-4 bg-gray-100  flex justify-between items-center">
                  <div className="text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 inline-block mr-1 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 9.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 13.586l4.293-4.293a1 1 0 011.414 0z" />
                    </svg>
                    {event.date}
                  </div>
                  <Link to={`/event/${event._id}`} className="text-blue-600 hover:text-blue-700  font-bold py-2 px-4 rounded">
                   View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UpcomingEvents;
