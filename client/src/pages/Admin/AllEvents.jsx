import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import Events from "./Events";
import Upcoming from "./Upcoming";

const AllEvents = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active , setActive] = useState(1)
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className=" mt-10">
            <Link className="p-10 font-semibold text-xl text-gray-600" > Events</Link>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="d-flex justify-content-center mt-5"></div>
            <div className="p-5  h-auto ">
              {
                active && active === 1 ? <Events /> : ""
              }
              {
                active && active === 2 ? <Upcoming /> : ""
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllEvents;
