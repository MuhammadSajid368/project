import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LoginStaff = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
    
      return (
        <div className="bg-gray-200 flex items-center justify-center h-screen">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login Staff</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:border-blue-500 transition duration-150" placeholder="you@example.com" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:border-blue-500 transition duration-150" placeholder="Enter your password" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg
                  hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-150">Login Here</button>
                <p className="text-gray-600 text-sm">Don't have  account? <Link to={"/auth/pre-signup-student"} className="text-blue-500
                  hover:text-blue-600 transition duration-150">Create Account</Link></p>
              </div>
            </form>
          </div>
        </div>
      );
    };


export default LoginStaff
