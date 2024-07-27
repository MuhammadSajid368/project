import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { useThemeProvider } from '../../utils/ThemeContext';
import {
  MdCategory,
  MdClass,
  MdPriceCheck,
  MdStart,
  MdTimer,
} from "react-icons/md";
import { CiImageOn, CiTimer } from "react-icons/ci";
import { fetchTeachers } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddCourse() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(fetchTeachers());
  }, [Dispatch]);
  const { loading, teachers, error } = useSelector((state) => state.teachers);
  const { currentTheme } = useThemeProvider();
  
  console.log(teachers);

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseInstructor: "",
    courseClasses: 0,
    courseOutline: "",
    coursePrice: 0,
    courseDescription: "",
    classDuration: "",
    classTimming: "",
    classesDay: [],
    startDate: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCourseData({ ...courseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    try {
      const response = await axios.post("/add/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert(response.data.message);

      // Reset form after successful submission
      setCourseData({
        courseName: "",
        courseInstructor: "",
        courseClasses: 0,
        courseOutline: "",
        coursePrice: 0,
        courseDescription: "",
        classDuration: "",
        classTimming: "",
        classesDay: [],
        startDate: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course. Please try again later.");
    }
  };

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
              <form onSubmit={handleSubmit} className="pl-14 pr-14">
                <p className={`font-extrabold text-2xl ${currentTheme === "dark" ? "text-white" : "text-gray-700"}`}>
                  Add Course
                </p>
                <div className="mb-3 mt-3">
                  <label
                    htmlFor="courseName"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Course Name:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <FaGraduationCap className="text-xl" />
                    </i>
                    <input
                      type="text"
                      name="courseName"
                      className={`w-full px-3 py-2 border ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      value={courseData.courseName}
                      onChange={handleChange}
                      placeholder="Course Name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="courseInstructor"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Instructor:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <FaChalkboardTeacher className="text-xl" />
                    </i>
                    <select
                      name="courseInstructor"
                      value={courseData.courseInstructor}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                    >
                      <option value="">Instructor</option>
                      {teachers
                        ? teachers.map((teacher) => (
                            <option
                              key={teacher._id}
                              value={teacher._id}
                              className={`${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} p-4`}
                            >
                              {teacher.first_name} {teacher.last_name}
                            </option>
                          ))
                        : "No Teacher Found!!"}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="coursePrice"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Price:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <MdPriceCheck className="text-xl" />
                    </i>
                    <input
                      type="number"
                      name="coursePrice"
                      value={courseData.coursePrice}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border border-gray-300 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      placeholder="Course Price"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="courseOutline"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Outline:
                  </label>
                  <ReactQuill
                    className={`border border-gray-300 p-2 rounded-lg w-full ${currentTheme === "dark" ? "bg-black text-white quill-dark" : "bg-white text-black quill-light"}`}
                    style={{ minHeight: "100px" }}
                    value={courseData.courseOutline}
                    onChange={(value) =>
                      setCourseData({ ...courseData, courseOutline: value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="courseClasses"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Classes:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <MdClass className="text-xl" />
                    </i>
                    <input
                      type="number"
                      className={`w-full px-3 py-2 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      name="courseClasses"
                      value={courseData.courseClasses}
                      onChange={handleChange}
                      placeholder="Course Classes"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="courseDescription"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Description:
                  </label>
                  <ReactQuill
                    className={`border border-gray-300 p-2 rounded-lg w-full ${currentTheme === "dark" ? "bg-black text-white quill-dark" : "bg-white text-black quill-light"}`}
                    style={{ minHeight: "100px" }}
                    value={courseData.courseDescription}
                    onChange={(value) =>
                      setCourseData({ ...courseData, courseDescription: value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="classDuration"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Class Duration:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <CiTimer className="text-xl" />
                    </i>
                    <input
                      type="text"
                      name="classDuration"
                      className={`w-full px-3 py-2 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      value={courseData.classDuration}
                      onChange={handleChange}
                      placeholder="Class Duration"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="classTimming"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Timming:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <MdTimer className="text-xl" />
                    </i>
                    <input
                      type="time"
                      name="classTimming"
                      className={`w-full px-3 py-2 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      value={courseData.classTimming}
                      onChange={handleChange}
                      placeholder="Class Timing"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="category"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Category:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <MdCategory className="text-xl" />
                    </i>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      required
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI & Machine Learning">
                        AI & Machine Learning
                      </option>
                      <option value="Programming and Software Development Courses">
                        Programming and Software Development Courses
                      </option>
                      <option value="Data Science and Analytics Courses">
                        Data Science and Analytics Courses
                      </option>
                      <option value="Cybersecurity Courses">
                        Cybersecurity Courses
                      </option>
                      <option value="Information Technology (IT) Management Courses">
                        Information Technology (IT) Management Courses
                      </option>
                      <option value="Computer Networking Courses">
                        Computer Networking Courses
                      </option>
                      <option value="Graphic Design and Multimedia Courses">
                        Graphic Design and Multimedia Courses
                      </option>
                      <option value="Microsoft Office and Productivity Courses">
                        Microsoft Office and Productivity Courses
                      </option>
                      <option value="Hardware and Operating System Courses">
                        Hardware and Operating System Courses
                      </option>
                      <option value="Web Design and Development Courses">
                        Web Design and Development Courses
                      </option>
                      <option value="E-commerce and Digital Marketing Courses">
                        E-commerce and Digital Marketing Courses
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="startDate"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Started At:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <MdStart className="text-xl" />
                    </i>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      name="startDate"
                      value={courseData.startDate}
                      onChange={handleChange}
                      placeholder="Start Date"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="image"
                    className={`block ${currentTheme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
                  >
                    Course Image:
                  </label>
                  <div className="flex items-center">
                    <i className="border p-2.5">
                      <CiImageOn className="text-xl" />
                    </i>
                    <input
                      type="file"
                      name="image"
                      className={`w-full px-3 py-2 ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10`}
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="justify-center items-center m-auto mt-6 w-full">
                  <button
                    type="submit"
                    className="p-4 text-center bg-indigo-700 rounded-2xl text-white"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
