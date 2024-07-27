import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HIstory = () => {
  return (
    <div className="w-full mt-28">
      <div className="flex mt-6 ml-10 items-center">
        <Link
          to={"/"}
          className="text-indigo-500 hover:text-indigo-800 hover:font-bold"
        >
          Eureka Learning{" "}
        </Link>{" "}
        <p className="ml-2  text-indigo-500 mr-2 font-extrabold text-xs">
          {" "}
          <FaAngleDoubleRight />{" "}
        </p>{" "}
        <Link
          to={"/about"}
          className="text-indigo-500 hover:text-indigo-800 hover:font-bold"
        >
          {" "}
          About{" "}
        </Link>
        <p className="ml-2  text-indigo-500 mr-2 font-extrabold text-xs">
          {" "}
          <FaAngleDoubleRight />{" "}
        </p>{" "}
        <Link
          to={"/about/our-history"}
          className="text-indigo-800 hover:text-indigo-600 font-bold hover:font-extrabold"
        >
          {" "}
          History
        </Link>
      </div>
      <div className="flex mt-16">
        <p className="text-3xl font-extrabold pl-11">Eureka Learning History</p>
      </div>
      <div>
        <div className="px-11 mt-2 w-2/3 justify-around">
          <div>
            <p className=" font-semibold text-indigo-600 mb-1 mt-3">
              Foundation and Establishment
            </p>
            <p className="text-sm opacity-90">
              The University of{" "}
              <Link to={"/"} className="text-indigo-500 font-semibold">
                Eureka Learning
              </Link>{" "}
              traces its origins back to{" "}
              <Link className="text-indigo-500 font-semibold">1980</Link>, when
              a group of visionaries and educators came together with the
              ambitious goal of establishing an institution dedicated to higher
              learning. Led by{" "}
              <Link className="text-indigo-500 font-semibold">Javeed Ali</Link>,
              the university was founded on principles of academic excellence,
              innovation, and service to society. Through their determination
              and commitment, the groundwork was laid for what would become a
              bastion of knowledge and enlightenment.
            </p>
            <p className="font-xl font-semibold text-indigo-600 mb-2 mt-3">
              Early Years and Inauguration
            </p>
            <p className="text-sm opacity-90">
              In <Link className="text-indigo-500 font-semibold">1980</Link>,
              amidst great anticipation and fanfare, the University of{" "}
              <Link to={"/"} className="text-indigo-500 font-semibold">
                Eureka Learning
              </Link>{" "}
              was officially inaugurated. The inaugural ceremony marked the
              culmination of years of meticulous planning and preparation.
              Dignitaries, scholars, and community members gathered to witness
              the birth of an institution that would shape the intellectual
              landscape for generations to come. With an initial cohort of eager
              students and a dedicated faculty, the university embarked on its
              journey of discovery and enlightenment.
            </p>
            <p className="font-xl font-semibold text-indigo-600 mb-2 mt-3">
              Growth and Expansion
            </p>
            <p className="text-sm opacity-90">
              {" "}
              In the ensuing years, the University of{" "}
              <Link to={"/"} className="text-indigo-500 font-semibold">
                Eureka Learning
              </Link>{" "}
              experienced significant growth and expansion. Under the leadership
              of visionary presidents and dedicated faculty members, the
              university expanded its academic offerings, diversified its
              student body, and enhanced its campus infrastructure. New academic
              programs were introduced, research initiatives flourished, and the
              university emerged as a hub of intellectual activity and
              innovation.
            </p>
            <p className="font-xl font-semibold text-indigo-600 mb-2 mt-3">
              Challenges and Resilience
            </p>
            <p  className="text-sm opacity-90">  However, this journey was not without its challenges. The university
            weathered economic downturns, societal upheavals, and geopolitical
            uncertainties. Yet, through resilience and perseverance, it remained
            steadfast in its commitment to its core mission. Faculty, staff,
            students, and alumni rallied together, demonstrating unwavering
            dedication to the university's ideals and values.</p>
           
            <p className="font-xl font-semibold text-indigo-600 mb-2 mt-3">
              Achievements and Recognition
            </p>
            <p  className="text-sm opacity-90">
            Over the decades, the University of{" "}
            <Link to={"/"} className="text-indigo-500 font-semibold">
              Eureka Learning
            </Link>{" "}
            has amassed a remarkable array of achievements and accolades. Its
            faculty members have produced groundbreaking research, its students
            have excelled in their fields of study, and its alumni have made
            significant contributions to society. The university has earned
            recognition on both national and international stages, solidifying
            its reputation as a preeminent institution of higher learning.</p>
            <p className="font-xl font-semibold text-indigo-600 mb-2 mt-3">
              Looking Ahead
            </p>
            <p className="text-sm opacity-90">  As it looks to the future, the University of{" "}
            <Link to={"/"} className="text-indigo-500 font-semibold">
              Eureka Learning
            </Link>{" "}
            remains committed to its founding principles while embracing the
            opportunities and challenges of the modern world. With a renewed
            focus on innovation, inclusivity, and sustainability, the university
            seeks to continue its legacy of excellence and service. As it
            embarks on its next chapter, the University of{" "}
            <Link to={"/"} className="text-indigo-500 font-semibold">
              Eureka Learning
            </Link>{" "}
            stands poised to shape the future of education and make a lasting
            impact on the world.</p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIstory;
