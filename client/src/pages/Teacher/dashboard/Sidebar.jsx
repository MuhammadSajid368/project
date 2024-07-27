import React, { useState, useEffect } from "react";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsFillImageFill,
  BsPerson,
  BsReverseLayoutSidebarReverse,
  BsSearch,
} from "react-icons/bs";
import { BiExit } from 'react-icons/bi';
import {
  AiFillDashboard,
  AiOutlineBarChart,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaCapsules, FaChargingStation } from "react-icons/fa6";
import { FaHome, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdTimeToLeave } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize(); // Set the initial state
    window.addEventListener('resize', handleResize); // Add event listener

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const Menu = [
    { title: "Dashboard", link: "/teacher/dashboard" },
    { title: "Home", icon: <FaHome />, link: "/" },
    {
      title: "Leaves",
      icon: <FaLeaf />,
      submenu: true,
      spacing : true ,
      subMenuItems: [
        { title: "Leave Requests", link: "/teacher/leave-requests" },
      ],
    },
    { title: "Events", icon: <AiOutlineBarChart />, link: "/teacher/upcoming-events" },
    { title: "Update Password", spacing: true, icon: <FaChargingStation />, link: "/teacher/update-password" },
    { title: "Profile",  icon: <BsPerson /> , link : "/teacher/profile"},
    { title: "Settings", icon: <AiOutlineSetting /> , link : "/teacher/update-password" },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-gray-200 h-auto p-5 pt-8 transition-all duration-500 relative min-h-screen ${
          open ? "w-72" : "w-20"
        }`}
      >
        <BsArrowLeftShort
          className={`bg-indigo-700 text-white text-3xl rounded-full absolute -right-3 top-9 border border-gray-500 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <FaCapsules
            className={`text-4xl rounded cursor-pointer block float-left mr-2 text-indigo-800 transition-transform duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <p
            className={`text-indigo-800 origin-left font-extrabold text-xl ml-1 mt-1 uppercase transition-transform duration-500 ${
              !open && "scale-0"
            }`}
          >
            Eureka Learning
          </p>
        </div>
        <div
          className={`flex items-center rounded-md bg-gray-300 mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch className="text-indigo-700 text-lg block float-left cursor-pointer" />
          <input
            type="search"
            className={`text-base bg-transparent w-full text-indigo-800 focus:outline-none border-none rounded ml-3 ${
              !open && "hidden"
            }`}
            placeholder="Search...."
          />
        </div>
        <div>
          <ul className="pt-2">
            {Menu.map((menu, index) => (
              <React.Fragment key={index}>
                <li
                  className={`text-indigo-800 text-md flex items-center gap-x-4 cursor-pointer font-semibold p-2 hover:text-indigo-700 ${
                    menu.spacing ? "mt-9" : "mt-2"
                  }`}
                >
                  <Link
                    to={menu.link}
                    className="text-2xl block float-left"
                  >
                    {menu.icon ? menu.icon : <AiFillDashboard />}
                  </Link>
                  <Link
                    className={`text-base font-medium flex-1 transition-all duration-500 ${
                      !open && "hidden"
                    }`}
                    to={menu.link}
                  >
                    {menu.title}
                  </Link>
                  {menu.submenu && open && (
                    <BsChevronDown
                      className={`${submenuOpen[index] && "rotate-180"}`}
                      onClick={() => toggleSubmenu(index)}
                    />
                  )}
                </li>
                {menu.submenu && submenuOpen[index] && open && (
                  <ul>
                    {menu.subMenuItems.map((submenuItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-indigo-700 text-sm ml-10 flex items-center gap-x-4 cursor-pointer px-5 font-semibold p-2 hover:text-indigo-600"
                      >
                        <Link to={submenuItem.link}>
                          {submenuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
