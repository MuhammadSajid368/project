import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const UsersRegisterForm = () => {
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* Toggle Password Hide or Show */
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const token = getToken(); 
      const { data } = await axios.post(`/user/signup`, { first_name , last_name , email, password, gender, role }); // Include the JWT token in the request body
      
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        toast.success("Account Created Successfully!! Login Now.");

        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
        setLoading(false);
      }
    }  catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const getToken = () => {
    return localStorage.getItem("jwtToken"); // Retrieve JWT token from local storage
  };

  return (
    <div>
      <div className="bg-neutral-50 shadow-lg  w-1/2 pl-7 rounded-xl px-8 pt-4 pb-8 mb-4  mt-16 items-center m-auto">
        <div className="text-2xl font-extrabold mb-4 ml-auto mr-auto">LMS </div>

        <div className="text-2xl font-semibold mb-4 ml-auto mr-auto">
          Create your account!
        </div>
        {loading && <div className="spinner"></div>}

        <form
          onSubmit={signupHandler}
          className="bg-neutral-50 shadow-md rounded px-8 pt-4 pb-8 mb-4    mt-5"
        >
        <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                First Name
              </label>
              <input
                placeholder=""
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                id="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
              <div className="port port-short" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Last Name
              </label>
              <input
                placeholder=""
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                id="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
              <div className="port port-short" />
            </div>
        </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder=""
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="port port-short" />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Gender:</label>
              <select
              name=""
              id=""
              value={gender}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="default" disabled>Select your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
              <option value="prefer not say">Prefer Not Say</option>
            </select>
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Role:</label>
            </div>
            <select
              name=""
              id=""
              value={role}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
              <option value="guests">Guest</option>
            </select>
          </div>
          
            {loading ? (
              <button type="button"   className=' flex  text-blue-700 font-bold hover:text-blue-600' disabled>
               Processing.......
              </button>
          ) : <button
            disabled={loading}
            className=' flex  text-blue-700 font-bold hover:text-blue-600'
            > Signup </button> }
          
          <div className="flex items-center mt-3">
            <p>Already Have an Account?</p>
            <Link to={"/auth/login"} className="ml-2 text-indigo-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersRegisterForm;
