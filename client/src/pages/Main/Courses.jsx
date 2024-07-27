import { useEffect } from "react";
import { fetchCourses } from "../../redux/actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDetails } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "../../context/auth";
import { useThemeProvider } from "../../utils/ThemeContext";

const Courses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { loading, courses, error } = useSelector((state) => state.courses);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const loggedIn = auth.user !== null && auth.token !== null && auth.refreshToken !== null;
  
  const { currentTheme } = useThemeProvider();

  const makePayment = async (course) => {
    const stripe = await loadStripe("pk_test_51PFz7gSBXJ5pqbcPaee09UlSXjoK4bgdKM33BCLknV0xoxYDydAQGlcNRuDBimPc1GA5mI1gXqWI1ECn2ep5y2O000HUL7yD4Z");
    const body = {
      course: course
    };
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch("http://localhost:8080/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error:" + error);
    }
  }
  
  const payment = () => {
    if (loggedIn) {
      // Proceed with payment
    } else {
      navigate("/auth/login");
    }
  }

  return (
    <div className={`flex mt-20 ${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {courses.map((course) => (
            <div className="items-center justify-center w-1/3 m-6" key={course._id}>
              <div className={`shadow-lg rounded-lg w-full ${currentTheme === 'dark' ? 'bg-gray-800 border border-white' : 'bg-white'}`}>
                <img className="w-full m-auto h-64 pt-4" src={course.images.url} alt="Course Image" />
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">Name: </p>
                    <p>{course.courseName}</p>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">Instructor:</p>
                    <p className="text-sm">{course.courseInstructor}</p>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">Start Date:</p>
                    <p>{course.startDate}</p>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">Price:</p>
                    <p>{course.coursePrice}$</p>
                  </div>
                </div>
                <div className="flex mb-10 items-center justify-end mr-2">
                  <Link to={`/course/detail/${course._id}`}>
                    <MdDetails className="text-2xl" />
                  </Link>
                </div>
                <div>
                  {course.coursePrice > 0 ? (
                    <div className="text-center">
                      <button
                        type="button"
                        className={`w-[80%] mx-auto font-extrabold text-xl p-4 rounded-3xl pl-5 pr-5 mb-3 ${currentTheme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}
                        onClick={() => makePayment(course)}
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <Link to={`/course/detail/${course._id}`}>Get</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Courses;
