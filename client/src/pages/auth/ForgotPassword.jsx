import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  /* states */
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const forgotHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, { email });
        toast.success(`${email} send successffully`)
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again!");
      setLoading(false);
    }
    finally{
      setLoading(false)
    }
  };
  if (loading) {
    <p>Loading...</p>
  }
  if (error) {
    <p>Error.....</p>
  }

  return (
    <div class="mt-52">
      <MetaData title={`Forgot Password`} />
      <div className="w-1/2 pl-7 rounded-xl mt-16 items-center m-auto">
        <form  className="bg-neutral-50 shadow-md rounded px-8 pt-4 pb-8 mb-4    mt-5" onSubmit={forgotHandler}>
          <p className="text-2xl font-black mb-4 ml-auto mr-auto">Forgot Password</p>
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
           <div className="flex justify-between align-middle">
           <button
                className=' flex  text-blue-700 font-bold hover:text-blue-600'
                disabled={loading}
              >
                {loading ? "Loading...." : "Send Email"}
              </button>
              <Link
                  to={"/auth/login"}
                  className="hover:text-indigo-500 "
                >
                 Login
                </Link>
           </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
