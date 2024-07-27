import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../partials/Sidebar";
import MetaData from "../../layout/MetaData";
import Header from "../../partials/Header";
import { courseDetails } from "../../redux/actions/courseAction";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
      dispatch(courseDetails(id));
  }, [dispatch, id]);

  const { loading, course, error } = useSelector((state) => state.courses);
  console.log(course);
  return (
    <div>
      <MetaData title={`Single Course Details`}></MetaData>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {loading ? (
                "Loading...."
              ) : (
                <>
                  <div className="w-2/3   m-auto">
                    <div className="mt-4 mb-7 ">
                      {/* {course.images.url ? (
                        <img
                          class="w-full"
                          src={course.images.url}
                          alt="Course Image"
                          className=" m-auto h-64 pt-4 rounded-2xl"
                        />
                      ) : (
                        ""
                      )} */}
                    </div>
                    <div className="pl-2 pr-2">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Course ID:</p>
                        <p>{course._id}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Course Name:</p>
                        <p>{course.courseName}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Course Instructor:</p>
                        <p>{course.courseInstructor}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Classes:</p>
                        <p>{course.courseClasses}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Price:</p>
                        <p>{course.coursePrice}$</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Class Duration:</p>
                        <p>{course.classDuration}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Class Timming:</p>
                        <p>{course.classTimming}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Starting From:</p>
                        <p>{course.startDate}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold ">Category:</p>
                        <p>{course.category}</p>
                      </div>
                      <div className=" mb-3">
                        <p className="font-semibold ">Outline:</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: course.courseOutline }}
                          >
                            
                          </div>
                      </div>
                      <div className=" mb-3">
                        <p className="font-semibold ">Description:</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: course.courseDescription }}
                          >
                            
                          </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
