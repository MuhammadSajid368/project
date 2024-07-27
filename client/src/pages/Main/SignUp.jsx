import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/pre-signup', { email, password });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Please check your email to activate your account');
        navigate('/login'); // Redirect to login page after successful signup
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Try again!!');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="sign-form">
        <div className="title">Apna Ghar Signup</div>
        <div className="subtitle">Create your account!</div>
        {loading && <div className="spinner"></div>}
        <form onSubmit={signupHandler}>
          <div className="input-container gap1">
            <input
              placeholder=""
              type="text"
              className="myInput"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="myLabel" htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-container gap2">
            <input
              placeholder=""
              type="password"
              className="myInput"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="myLabel" htmlFor="password">
              Password
            </label>
          </div>
          <button disabled={loading} className=' flex  text-blue-700 font-bold hover:text-blue-600'>
            {loading ? 'Loading....' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
