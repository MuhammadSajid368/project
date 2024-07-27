import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import MetaData from "../../layout/MetaData";


const Login = () => {
  /* context */
  const [auth, setAuth] = useAuth();
  /* states */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, { email, password });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("your are login successfully");
        // window.location.reload()
        setLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      
    }
  };

  return (
    <Fragment>
    <MetaData title={" Login | LMS | Join Us Today to fillfull your Dreams!"} />
      <div className="w-1/2 pl-7 rounded-xl mt-16 items-center m-auto">
        <div class="">
          <form
            className="bg-neutral-50 shadow-md rounded px-8 pt-4 pb-8 mb-4    mt-5"
            onSubmit={loginHandler}
          >
            <p
              className="text-2xl font-black mb-4 ml-auto mr-auto"
            >
               Login Here
            </p>
            {loading && <div className="spinner"></div>}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center">
                <i className="border p-2.5">
                  <MdEmail />
                </i>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <div className="relative flex items-center">
                <i className=" border p-2.5">
                  <RiLockPasswordFill />
                </i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 pr-10"
                  placeholder="Password"
                  required
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
            <div class=" flex items-center justify-between">
              <button
                className=' flex  text-blue-700 font-bold hover:text-blue-600'
                disabled={loading}
              >
                {loading ? "Loading...." : "Login"}
              </button>
              <div>
                <Link
                  to={"/auth/forgot-password"}
                  className="hover:text-indigo-900"
                >
                  Forgot Password?{" "}
                </Link>
              </div>
            </div>
            <div className="flex mt-3">
              <p>Already Have an Account?</p>
              <button>
                <Link to="/register/now" className="ml-2 text-indigo-600">
                  {" "}
                  Create Account
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
