import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../layout/MetaData";
import { courseDetails } from "../../redux/actions/courseAction";
import { useParams } from "react-router-dom";
import { useThemeProvider } from "../../utils/ThemeContext";

const SingleCourse = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(courseDetails(id));
  }, [dispatch, id]);
  const { currentTheme, toggleTheme } = useThemeProvider();
  const { loading, course, error } = useSelector((state) => state.courses);

  return (
    <div
      className={`min-h-screen ${
        currentTheme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      } py-10`}
    >
      <MetaData title="Single Course Details" />
      <div className="container mx-auto">
        {loading ? (
          <div className="text-lg font-semibold text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-lg font-semibold text-center">
            Error: {error}
          </div>
        ) : (
          <div
            className={`shadow-md rounded-lg overflow-hidden ${
              currentTheme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {course?.images?.url && (
              <img
                src={course.images.url}
                alt="Course Image"
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">{course?.courseName}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Course ID:</p>
                  <p>{course?._id}</p>
                </div>
                <div>
                  <p className="font-semibold">Course Instructor:</p>
                  <p>{course?.courseInstructor}</p>
                </div>
                <div>
                  <p className="font-semibold">Classes:</p>
                  <p>{course?.courseClasses}</p>
                </div>
                <div>
                  <p className="font-semibold">Price:</p>
                  <p>${course?.coursePrice}</p>
                </div>
                <div>
                  <p className="font-semibold">Class Duration:</p>
                  <p>{course?.classDuration}</p>
                </div>
                <div>
                  <p className="font-semibold">Class Timing:</p>
                  <p>{course?.classTimming}</p>
                </div>
                <div>
                  <p className="font-semibold">Starting From:</p>
                  <p>{course?.startDate}</p>
                </div>
                <div>
                  <p className="font-semibold">Category:</p>
                  <p>{course?.category}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold">Outline:</p>
                <div
                  className={`p-4 border rounded-lg ${
                    currentTheme === "dark"
                      ? "border-gray-700 bg-gray-800 text-gray-300"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  dangerouslySetInnerHTML={{ __html: course?.courseOutline }}
                />
              </div>

              <div>
                <p className="font-semibold">Description:</p>
                <div
                  className={`p-4 border rounded-lg ${
                    currentTheme === "dark"
                      ? "border-gray-700 bg-gray-800 text-gray-300"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: course?.courseDescription,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
