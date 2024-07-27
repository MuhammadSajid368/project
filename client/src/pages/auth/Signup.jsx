import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const { data } = await axios.post(`http://localhost:8080/api/v1/pre-signup`, { email, password });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Please check your email to activate your account");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="Email*"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center px-4 py-2 font-bold rounded`}
          >
            {loading ? <>loading....</> : "Signup"}
          </button>

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

export default Signup;
