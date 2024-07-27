import React from "react";
import image from "../../../images/department.jpg";
import identity from "../../../images/identity.jpg";
import library from "../../../images/library.jpg";
import quality from "../../../images/qulaity.jpg";
import centres from "../../../images/centres.jpg";
import feacult from "../../../images/feaculty.jpeg";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <div className="flex mt-6 ml-10 items-center">
        <Link
          to={"/"}
          className="text-indigo-400 hover:text-indigo-800 hover:font-bold"
        >
          Eureka Learning{" "}
        </Link>{" "}
        <p className="ml-2  text-indigo-600 mr-2 font-extrabold text-xs">
          {" "}
          <FaAngleDoubleRight />{" "}
        </p>{" "}
        <Link
          to={"/about"}
          className="text-indigo-700 font-semibold hover:text-indigo-500 hover:font-extrabold"
        >
          {" "}
          About{" "}
        </Link>
      </div>
      <div className="flex items-center justify-center mt-10">
        <p className="text-3xl font-extrabold "> Eureka Learning </p>{" "}
        <p className="ml-2 font-bold text-2xl mt-1 text-blue-700"> is...</p>
      </div>
      <div>
        <div className="flex flex-wrap justify-center mt-10 ml-5 mb-2">
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56"
                  src={identity}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2 ">
                    Identity
                  </h5>
                </a>
                <p className="mb-3 font-normal p-2 text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56"
                  src={quality}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2">
                    Quality
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 p-2">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img className="rounded-t-lg h-56 w-full" src={centres} />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2">
                    Centres
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img className="rounded-t-lg h-56 w-full" src={image} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2">
                    Schools & Departments
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img
                  className="rounded-t-lg h-56 w-full"
                  src={library}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2">
                    Libraries
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 mb-5 px-2">
            <div className="bg-white border hover:translate-y-1.5 hover:transition-all transition hover:shadow-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56"
                  src={feacult}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight  text-indigo-900 pl-2">
                    Feaculty
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center font-extrabold text-3xl text-indigo-700 mt-7">
          ACCREDITATIONS
        </p>
        <p className="md:pl-52 md:pr-52 sm:pl-2 sm:pr-2 xs:pl-2 xs:pr-2  text-center justify-between mt-2 mb-2 opacity-80 font-bold">
          The goal of accreditation is to ensure that education provided by
          institutions of higher education meets acceptable levels of quality.
          Accreditation is your assurance that the University meets quality
          standards.
        </p>
        <hr className="w-[60%] mt-7 h-[3px] bg-slate-500   mx-auto " />
      </div>
      <div class="mt-6 sm:mt-12">
    <p class="mt-6 pl-4 sm:pl-10 font-bold text-2xl">More About:</p>
    <div class="flex flex-col sm:flex-row justify-center items-center sm:ml-12 sm:mr-12 mt-3 mb-6">
        <div class="w-full sm:w-1/3 mb-6 sm:mb-0">
            <p class="font-semibold text-xl ml-3 text-gray-900 opacity-50">Discover Eureka Learning</p>
            <ul class="list-none pl-4">
                <div><Link to={"/about/chairman's-message"}  class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Chairman's Message <span class="ml-1 text-indigo-500">&#10230;</span></Link></div>
                <li><Link to={"/about/rector's-message"}  class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Rector's Message <span class="ml-1 text-indigo-500">&#10230;</span></Link></li>
                <li><Link to={"/about/our-history"} class="flex items-center justify-normal text-blue-700 font-bold hover:underline">History <span class="ml-1 text-indigo-500">&#10230;</span></Link></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Mission & Vision <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
            </ul>
        </div>
        <div class="w-full sm:w-1/3 mb-6 sm:mb-0">
            <p class="font-semibold text-xl ml-3 text-gray-900 opacity-50">Life of Eureka Learning</p>
            <ul class="list-none pl-4">
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Student Services <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Career Services <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">International Students <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Clubs & Societies <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
            </ul>
        </div>
        <div class="w-full sm:w-1/3 mb-6 sm:mb-0">
            <p class="font-semibold text-xl ml-3 text-gray-900 opacity-50">Researches</p>
            <ul class="list-none pl-4">
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Libraries <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Vaccines <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
                <li><a href="#" class="flex items-center justify-normal text-blue-700 font-bold hover:underline">Antisera <span class="ml-1 text-indigo-500">&#10230;</span></a></li>
            </ul>
        </div>
    </div>
</div>

    </div>
  );
};

export default About;
