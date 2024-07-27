import React, { useState } from 'react'
import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsPerson, BsReverseLayoutSidebarReverse, BsSearch } from 'react-icons/bs'
import { AiFillDashboard, AiFillEnvironment, AiOutlineBarChart, AiOutlineFileText, AiOutlineLogout, AiOutlineMail, AiOutlineSetting } from 'react-icons/ai'
import { FaCapsules } from 'react-icons/fa6'
const Sidebar = () => {
    const [open , setOpen] = useState(true)
    const [submenuopen , setsubmenuopen] = useState(false)
    const Menu = [
        {title : "Dashboard"},
        {title : "Pages" , icon : <AiOutlineFileText /> },
        {title : "Media" , spacing : true , icon : <BsFillImageFill />},
        {
            title : "Projects" ,
            icon : <BsReverseLayoutSidebarReverse /> ,
            submenu : true ,
            subMenuItems : [
            {title : "Subment 1"},
            {title : "Subment 1"},
            {title : "Subment 1"}],
        },
        {title : "Analytics" , icon : <AiOutlineBarChart /> },
        {title : "Inbox" , icon : <AiOutlineMail />},
        {title : "Profile" , spacing : true , icon : <BsPerson />},
        {title : "Settings" , icon : <AiOutlineSetting />},
        {title : "Logount" , icon : <AiOutlineLogout />},
    ]
  return (
    <div className='flex'>
        <div className={`bg-gray-200 h-screen p-5 pt-8 ${ open ? "w-72" : "w-20"} duration-500 relative `}>
            <BsArrowLeftShort className={`bg-indigo-700 text-white text-3xl rounded-full absolute -right-3 top-9 border border-gray-500 cursor-pointer ${!open && "rotate-180"}`}  onClick={() => setOpen(!open)} />
            <div className=''>
                <div className='inline-flex'>< FaCapsules className={`text-4xl rounded cursor-pointer block float-left mr-2 text-indigo-800 duration-500 ${open && "rotate-[360deg] text-4xl"}`}  />
                <p className={`text-indigo-800 origin-left font-extrabold text-xl ml-1 mt-1 uppercase duration-500 ${!open && "scale-0 " }`}>Eureka Learning</p></div>
            </div>
            <div className={`flex items-center rounded-md bg-gray-300 mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
              <BsSearch className='text-indigo-700 text-lg block float-left cursor-pointer' />
              <input type="search" className={`text-base bg-transparent w-full text-indigo-800 focus:border-none focus:outline-none border-none outline-none rounded ml-3 ${!open && "hidden"}`} placeholder='Search....' name="" id="" />
            </div>
            <div>
                <ul className='pt-2'>
                    {
                        Menu.map((menu , index) => (
                            <>
                              <li key={index} className={`text-indigo-800 text-md flex items-center gap-x-4 cursor-pointer font-semibold p-2 hover:text-indigo-700 ${menu.spacing ? "mt-9" : "mt-2"} `}>
                                <span className='text-2xl block float-left' >
                                {
                                    menu.icon ? menu.icon : <AiFillDashboard />
                                } 
                                </span>
                                <span className={`text-base font-medium flex-1 duration-500 ${!open && "hidden"} `}>{menu.title}</span>
                                {
                                    menu.submenu && open && (
                                        <BsChevronDown className={`${submenuopen && "rotate-180"}`} onClick={() => setsubmenuopen(!submenuopen)} />
                                    )
                                }
                              </li>
                              {
                                menu.submenu && submenuopen && open && (
                                    <ul>
                                        {menu.subMenuItems.map((submenuItem , index) => (
                                            <li key={index} className={`text-indigo-700 text-sm ml-10 flex items-center gap-x-4 cursor-pointer px-5 font-semibold p-2 hover:text-indigo-600  `}>{submenuItem.title}</li>
                                        ))}
                                    </ul>
                                )
                              }
                            </>
                        ))
                    }
                </ul>
            </div>
        </div>
        <div className='p-7'>
         <p className='text-2xl font-semibold'>Home Page</p>
        </div>
    </div>
  )
}

export default Sidebar