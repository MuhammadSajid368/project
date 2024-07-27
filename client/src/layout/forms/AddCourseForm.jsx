import React from 'react'

const AddCourseForm = () => {

    const [courseData, setCourseData] = useState({
        courseName: "",
        courseInstructor: "",
        courseClasses: 0,
        courseOutline: [],
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
                courseOutline: [],
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
      <form onSubmit={handleSubmit} className="pl-14 pr-14">
          <p className="font-extrabold  text-2xl text-gray-700">
              Add Course
          </p>
          <div className="mb-3  mt-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
                  Course Name:
              </label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <FaGraduationCap className="text-xl" />
                  </i>
                  <input
                      type="text"
                      name="courseName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      value={courseData.courseName}
                      onChange={handleChange}
                      placeholder="Course Name"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Instructor:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <FaChalkboardTeacher className="text-xl" />
                  </i>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      name="courseInstructor"
                      value={courseData.courseInstructor}
                      onChange={handleChange}
                      placeholder="Course Instructor"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Price:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdPriceCheck className="text-xl" />
                  </i>
                  <input
                      type="number"
                      name="coursePrice"
                      value={courseData.coursePrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      placeholder="Course Price"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Outline:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdOutline11Mp className="text-xl" />
                  </i>
                  <input
                      type="text"
                      name="courseOutline"
                      value={courseData.courseOutline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      placeholder="Course Outline"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Classes:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdClass className="text-xl" />
                  </i>
                  <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      name="courseClasses"
                      value={courseData.courseClasses}
                      onChange={handleChange}
                      placeholder="Course Classes"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Description:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdDetails className="text-xl" />
                  </i>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      name="courseDescription"
                      value={courseData.courseDescription}
                      onChange={handleChange}
                      placeholder="Course Description"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Class Duration:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <CiTimer className="text-xl" />
                  </i>
                  <input
                      type="text"
                      name="classDuration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      value={courseData.classDuration}
                      onChange={handleChange}
                      placeholder="Class Duration"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Timming:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdTimer className="text-xl" />
                  </i>
                  <input
                      type="time"
                      name="classTimming"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      value={courseData.classTimming}
                      onChange={handleChange}
                      placeholder="Class Timing"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Category:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdCategory className="text-xl" />
                  </i>
                  <select name="" id="" value={courseData.category} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10">
                      <option value="Web Development" >Web Development</option>
                      <option value="Data Science" >Data Science</option>
                      <option value="AI & Machine Learning" >AI & Machine Learning</option>
                      <option value="Programming and Software Development Courses" >Programming and Software Development Courses</option>
                      <option value="Data Science and Analytics Courses" >Data Science and Analytics Courses</option>
                      <option value="Cybersecurity Courses" >Cybersecurity Courses</option>
                      <option value="Information Technology (IT) Management Courses" >Information Technology (IT) Management Courses</option>
                      <option value="Computer Networking Courses" >Computer Networking Courses</option>
                      <option value="Graphic Design and Multimedia Courses" >Graphic Design and Multimedia Courses</option>
                      <option value="Microsoft Office and Productivity Courses" >Microsoft Office and Productivity Courses</option>
                      <option value="Hardware and Operating System Courses" >Hardware and Operating System Courses</option>
                      <option value="Web Design and Development Courses" >Web Design and Development Courses</option>
                      <option value="E-commerce and Digital Marketing Courses" >E-commerce and Digital Marketing Courses</option>
                  </select>
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Started At:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <MdStart className="text-xl" />
                  </i>
                  <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      name="startDate"
                      value={courseData.startDate}
                      onChange={handleChange}
                      placeholder="Start Date"
                      required
                  />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Course Image:</label>
              <div className="flex items-center">
                  <i className="border p-2.5">
                      <CiImageOn className="text-xl" />
                  </i>
                  <input
                      type="file"
                      name="image"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                  />
              </div>
          </div>
          <div className="justify-center items-center m-auto mt-6 w-full">
              <button type="submit" className=" p-4 text-center bg-indigo-700  rounded-2xl  text-white">Add Course</button>
          </div>
      </form>
  )
}

export default AddCourseForm