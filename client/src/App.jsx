import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
// Import pages
import { Toaster } from "react-hot-toast";
import AccountActivation from "./pages/auth/AccountActivate.jsx";
// import StudentsTable from "./Componenets/StudentsTable";
import { AuthProvider } from "./context/auth.jsx";
import Navbar from "./layout/Navbar.jsx";
import Dashboard from "./pages/Admin/Dashboard";
import Home from "./pages/Main/Home";
import SignUp from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import AccessAccount from "./pages/auth/AccessAccount.jsx";
import P404 from "./layout/P404.jsx";
import AllUsers from "./pages/Admin/AllUsers.jsx";
import SingleUser from "./pages/Admin/SingleUser.jsx";
import LeaveRequestForm from "./layout/forms/LeaveRequestForm.jsx";
import UsersRegisterForm from "./pages/auth/UsersRegisterFomr.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import AddCourse from "./pages/Admin/AddCourse.jsx";
import CoursesList from "./pages/Admin/AllCourses.jsx";
import AddEvents from "./pages/Admin/AddEvents.jsx";
import Update from "./pages/Admin/UpdateEvent.jsx";
import RegisterNow from "./pages/Main/RegisterNow.jsx";
import Courses from "./pages/Main/Courses.jsx";
import About from "./pages/Main/About/About.jsx";
import SingleCourse from "./pages/Admin/SingleCourse.jsx";
import AllStudents from "./pages/Admin/AllStudents.jsx";
import AllTeachers from "./pages/Admin/AllTeachers.jsx";
import AllFeaculty from "./pages/Admin/AllFeaculty.jsx";
import MaybeShow from "./components/MaybeShow.jsx";
import CourseDetails from "./pages/Main/CourseDetails.jsx";
import FeacultyDashboard from "./pages/Faculty/dashboard/FeacultyDashboard.jsx";
import StudentDashboard from "./pages/Student/dashboard/StudentDashboard.jsx";
import TeacherDashboard from "./pages/Teacher/dashboard/TeacherDashboard.jsx";
import GuestDashboard from "./pages/guest/dashboard/GuestDashboard.jsx";
import Leave from "./pages/Student/dashboard/Leave.jsx";
import CharimansMessage from "./pages/Main/About/CharimansMessage.jsx";
import RectorMessages from "./pages/Main/About/RectorMessages.jsx";
import HIstory from "./pages/Main/About/HIstory.jsx";
import UpcomingEvents from "./pages/Student/dashboard/UpcomingEvents.jsx";
import AllEvents from "./pages/Admin/AllEvents.jsx";
import Profile from "./pages/Student/dashboard/Profile.jsx";
import UpdateUserForm from "./layout/forms/updateUserForm.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainAttendence from "./layout/MainAttendence.jsx";
import EventDetails from "./pages/Student/dashboard/EventDetails.jsx";
import LeaveList from "./pages/Student/dashboard/LeavesData.jsx";
import PrivateRoutes from "./layout/routes/PrivateRoutes.jsx";
import Unauthorized from "./layout/Unauthorized.jsx";
import ProtectedRoute from "./layout/routes/ProtectedRoutes.jsx";
import Footer from "./layout/Footer.jsx";
import DetailEvent from "./pages/Main/EventDetails.jsx";
import Blocked from "./layout/Blocked.jsx";
import TeacherProfile from "./pages/Teacher/dashboard/TeacherProfile.jsx";
import TeacherEvents from "./pages/Teacher/dashboard/TeacherEvents.jsx";
import TeacherDetails from "./pages/Teacher/dashboard/TeacherDetails.jsx";
import LeaveRequests from "./pages/Teacher/dashboard/LeaveRequests.jsx";
import Settings from "./pages/Student/dashboard/UpdatePassword.jsx";
import UpdateTeacher from "./pages/Teacher/dashboard/UpdatePasswordTeacher.jsx";
import UpdatePasswordAdmin from "./pages/Admin/UpdatePasswordAdmin.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import Success from "./pages/Main/Success.jsx";

function App() {
  const location = useLocation();

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <div className="m-0 p-0 top-0 ">
      <AuthProvider>
        <MaybeShow>
          <Navbar />
        </MaybeShow>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/about/chairman's-message"
            element={<CharimansMessage />}
          />
          <Route exact path="/blocked" element={<Blocked />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/event/:id" element={<DetailEvent />} />

          <Route path="/attendence" element={<MainAttendence />} />
          <Route path="/leaves" element={<LeaveList />} />
          <Route path="/about/rector's-message" element={<RectorMessages />} />
          <Route path="/about/our-history" element={<HIstory />} />
          <Route path="/register/now" element={<RegisterNow />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/detail/:id" element={<CourseDetails />} />

          <Route path="/add/event" element={<AddEvents />} />

          {/*  Auth Routes */}
          <Route path="/create/account" element={<UsersRegisterForm />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth/access-account/:token"
            element={<AccessAccount />}
          />
          <Route
            path="/auth/account-activate/:token"
            element={<AccountActivation />}
          />
          <Route path="/event" element={<AddEvents />} />
          <Route path="/update/:id" element={<Update />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/update/user/:id" element={<UpdateUserForm />} />
          <Route exact path="/success" element={<Success />} />
          {/* </Route> */}

          {/* Student Routes */}
          <Route exact path="/student/dashboard" element={<ProtectedRoute role="student"> <StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/upcoming/events" element={ <ProtectedRoute role="student"> <UpcomingEvents /> </ProtectedRoute>} />
          <Route path="/student/leaves" element={ <ProtectedRoute role="student"><LeaveList /> </ProtectedRoute>}/>
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/update-password" element={<Settings />} />
          <Route path="/dashboard/profile" element={ <ProtectedRoute role="student"> <Profile /></ProtectedRoute>} />
          <Route path="/student/request-for-leave" element={<ProtectedRoute role="student"> <Leave /></ProtectedRoute>} />
          {/* End Student Route */}



          {/* Teacher Route */}
          <Route path="/teacher/dashboard" element={ <ProtectedRoute role="teacher"><TeacherDashboard /> </ProtectedRoute>}/>
          <Route path="/teacher/profile" element={ <ProtectedRoute role="teacher"><TeacherProfile /> </ProtectedRoute>}/>
          <Route path="/teacher/update-password" element={ <ProtectedRoute role="teacher"><UpdateTeacher /> </ProtectedRoute>}/>
          <Route path="/teacher/upcoming-events" element={ <ProtectedRoute role="teacher"><TeacherEvents /> </ProtectedRoute>}/>
          <Route path="/event-details/:id" element={ <ProtectedRoute role="teacher"><TeacherDetails /> </ProtectedRoute>}/>
          <Route path="/teacher/leave-requests" element={ <ProtectedRoute role="teacher"><LeaveRequests /> </ProtectedRoute>}/>
          {/* End Teacher Route */}

          {/* Staff Route */}
          <Route path="/staff/dashboard" element={<FeacultyDashboard />} />
          {/* End Staff Route */}

          {/* Guest Route */}
          <Route path="/guest/dashboard" element={<GuestDashboard />} />
          {/* End Guest Route */}

          {/* Admin Route */}
          <Route exact path="/admin/courses/add" element={<ProtectedRoute role="admin"> <AddCourse /></ProtectedRoute>} />
          <Route exact path="/update-password-admin" element={<ProtectedRoute role="admin"> <UpdatePasswordAdmin /></ProtectedRoute>} />
          <Route path="/admin/all-users-data" element={ <ProtectedRoute role="admin"><AllUsers /></ProtectedRoute> } />
          <Route path="/admin-profile" element={ <ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute> } />
          <Route path="/students/record" element={ <ProtectedRoute role="admin"> <AllStudents />  </ProtectedRoute>  }  />
          <Route  path="/professor/list" element={  <ProtectedRoute role="admin">  <AllTeachers />  </ProtectedRoute>  }  />
          <Route  path="/admin/upcoming/events" element={ <ProtectedRoute role="admin"> <AllEvents /> </ProtectedRoute> } />
          <Route path="/feaculty/users" element={ <ProtectedRoute role="admin"> <AllFeaculty /> </ProtectedRoute>}/>
          <Route path="/admin/courses/list" element={ <ProtectedRoute role="admin"> <CoursesList /></ProtectedRoute>}/>
          <Route
            path="/courses/details/:id"
            element={
              <ProtectedRoute role="admin">
                {" "}
                <SingleCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute role="admin">
                {" "}
                <SingleUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-for-leave"
            element={
              <ProtectedRoute role="admin">
                <LeaveRequestForm />
              </ProtectedRoute>
            }
          />
          {/* End Admin Route */}

          <Route exact path="*" element={<P404 />} />
        </Routes>

        <MaybeShow>
          {" "}
          <Footer />
        </MaybeShow>
      </AuthProvider>
    </div>
  );
}

export default App;
