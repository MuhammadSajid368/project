import React, { useEffect, useState } from "react";
import { fetchCourses } from "../../redux/actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link } from "react-router-dom";
import { MdDelete, MdDetails } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { SkeletonLoader } from "../../layout/SekeltonLoading";
import { useThemeProvider } from "../../utils/ThemeContext";

const CoursesList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(fetchCourses());
  }, [Dispatch]);
  const { loading, courses, error, coursesCount } = useSelector(
    (state) => state.courses
  );
  const { currentTheme } = useThemeProvider();
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div
                className={`p-5 ${
                  currentTheme === "dark" ? "text-white" : "text-black"
                } h-auto `}
              >
                <h1 className="text-xl mb-2 font-bold">Courses Record</h1>
                {loading ? (
                  <SkeletonLoader />
                ) : error ? (
                  <p>Error Occurred!</p>
                ) : (
                  <>
                    <div>Total Courses: {coursesCount} </div>
                    {courses.map((course) => (
                      <div className="items-center flex justify-center m-6 w-1/2">
                        <div
                          class={`shadow-lg ${
                            currentTheme === "dark"
                              ? "text-white"
                              : "text-black"
                          } rounded-lg`}
                          key={course._id}
                        >
                          <img
                            class="w-full"
                            src={course.images.url}
                            alt="Course Image"
                            className=" m-auto h-64 pt-4"
                          />
                          <div class="px-6 py-4">
                            <div class="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-semibold">Name : </p>
                              </div>
                              <div>{course.courseName}</div>
                            </div>
                            <div
                              className="flex items-center justify-between mb-1"
                              key={course.courseInstructor}
                            >
                              <div>
                                <p className="font-semibold">Instructor:</p>
                              </div>
                              <div className="text-sm">
                                {course.courseInstructor}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-semibold">Start Date:</p>
                              </div>
                              <div>
                                <p>{course.startDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-semibold">Price:</p>
                              </div>
                              <div>
                                <p>{course.coursePrice}$</p>
                              </div>
                            </div>
                          </div>
                          <div class="px-6 py-4">
                            <span
                              class={`inline-block ${
                                currentTheme === "dark"
                                  ? "text-white"
                                  : "text-black"
                              } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}
                            >
                              #Beginner
                            </span>
                            <span
                              class={`inline-block ${
                                currentTheme === "dark"
                                  ? "text-white"
                                  : "text-black"
                              } rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}
                            >
                              #Programming
                            </span>
                          </div>
                          <div className="mb-3 pb-4 mr-0 ml-[90%]">
                            <Link to={`/courses/details/${course._id}`}>
                              <MdDetails className="text-2xl" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
