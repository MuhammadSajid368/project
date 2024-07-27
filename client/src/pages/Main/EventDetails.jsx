import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventDetails } from "../../redux/actions/eventAction";
import { useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { FaMapLocation } from "react-icons/fa6";
import { BiLocationPlus, BiTimer, BiUser } from "react-icons/bi";
import { SkeletonLoader } from "../../layout/SekeltonLoading";

const DetailEvent = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false)
  const { id } = useParams();

  if (loading) {
    <SkeletonLoader />
  }

  useEffect(() => {
    dispatch(eventDetails(id));
  }, [dispatch, id]);
  const event = useSelector((state) => state.events.event);
  console.log(event);
  return (
    <div className="flex">
      <MetaData title={`${event.title}`} />
      <div className="p-7">
        <main>
          <div className="font-extrabold text-3xl mt-6 sm:font-bold ">
            {event.title}
          </div>
          <div className="p-10 w-full">
            <div className="flex">
              <div className="w-1/2">
               {
                event.image && ( <img src={event.image.url} alt="" className=" h-96 " />)
               }
              </div>
              <div className="w-1/2">
                <div className="ml-8 mt-8 text-xl font-bold">{event.title}</div>
                <div className="flex items-center ml-8 mt-6"> <BiLocationPlus className="text-indigo-700 font-bold text-2xl mr-2" /> <p className="font-semibold text-xl text-indigo-700 mr-1 "> Event Location : </p> <p className="text-lg font-semibold"> {event.location}</p></div>
                <div className="flex items-center ml-8 mt-6"> <BiUser className="text-indigo-700 font-bold text-2xl  mr-2" /> <p className="font-semibold text-xl text-indigo-700 mr-1 "> Event Organizer : </p> <p className="text-lg font-semibold"> {event.organizer}</p></div>
                <div className="flex items-center ml-8 mt-6"> <BiTimer className="text-indigo-700 font-bold text-2xl  mr-2" /> <p className="font-semibold text-xl text-indigo-700 mr-1 ">Start From : </p> <p className="text-lg font-semibold"> {event.date}</p></div>
                <div className="flex items-center ml-8 mt-6"> <BiTimer className="text-indigo-700 font-bold text-2xl  mr-2" /> <p className="font-semibold text-xl text-indigo-700 mr-1 ">Ended  At : </p> <p className="text-lg font-semibold"> {event.endDate}</p></div>
              </div>
            </div>
            <div>
            <div className="mt-8"><p className=" text-xl font-bold text-indigo-700"> Decription :</p> <p>{event.description}</p></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailEvent
