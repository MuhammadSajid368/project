import React from 'react';
import BGImage from '../images/middle.png';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from "react-router-dom"
import { useAuth } from '../context/auth';
import { FaArrowAltCircleRight, FaArrowRight } from 'react-icons/fa';


const Middle = () => {
  const [auth, setAuth] = useAuth();
  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";
  return (
    <div className="middle bg-gray-200 md:h-[500px]">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="md:w-[50%] md:pr-11 pl-16 max-w-md:ml-0">
          <p className="pl-4 md:pl-0 pt-4 md:pt-36 font-[1000] text-4xl text-black text-center md:text-left">
            LMS.
          </p>
          <p className="pl-4 md:pl-0 pt-4 font-extralight text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis illum neque illo! Accusamus odit totam,
            voluptas aperiam nesciunt placeat. Voluptatem eius fugit sequi? Magnam, ducimus ea. Officia deserunt
            pariatur ullam?
          </p>

          {
            loggedIn ? (
              <div className='flex items-center mt-3'>
                <Link to={"/admin/dashboard"} className=' flex  text-blue-700 font-bold hover:text-blue-600'>
                  Go to Dahboard
                  <FaArrowRight className="mt-1 ml-1" />
                </Link>

              </div>
            ) : (
              <div className='mt-6'>
                <Link to={"/register/now"} className=' flex  text-blue-700 font-bold hover:text-blue-600'>
                  Create Account <FaArrowAltCircleRight className='ml-2 mt-1' />
                </Link>

              </div>
            )
          }
        </div>
        <div className="hidden md:block">
          <img src={BGImage} alt="" className="w-[300px] h-[500px] ml-4 md:ml-0 mr-32" />
        </div>
      </div>
    </div>
  );
};

export default Middle;
