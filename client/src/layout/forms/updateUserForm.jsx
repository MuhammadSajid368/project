import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/userAction";

const UpdateUserForm = ({ id }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const {user , error}  = userState;

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user ? user.username : "");
  const [first_name, setFirst_name] = useState(user ? user.first_name : "");
  const [last_name, setLast_name] = useState(user ? user.last_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [address, setAddress] = useState(user ? user.address : "");
  const [gender, setGender] = useState(user ? user.gender : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(`submitted`);
      dispatch(updateUser(first_name, last_name, email, gender, address));
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
        />
        <input type="email" name="email" value={email} placeholder="Email" />
        {/* <input type="password" name="password" value={password}  placeholder="Password" /> */}
        <input
          type="text"
          name="first_name"
          value={first_name}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Address"
        />
        {/* <select name="status" value={status} >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="block">Block</option>
          <option value="pending">Pending</option>
        </select> */}
        <select name="gender" value={gender}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="custom">Custom</option>
          <option value="prefer not say">Prefer not say</option>
        </select>
        <button type="submit" onClick={handleSubmit}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
