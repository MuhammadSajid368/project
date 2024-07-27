import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth.jsx';

const AccountActivate = () => {
  /* context */
  const [auth, setAuth] = useAuth();
  /* useParams hook */  
  const {token} = useParams();
  const navigate = useNavigate();
  //console.log(token);
  /* useEffect hook */
  useEffect(()=>{
    if (token) requestForActivation();
  }, [token])
  const requestForActivation = async () => {
          const {data} = await axios.post(`/signup`, {token});
          if(data?.error){ /// "data && data.error"
             toast.error(data.error);
          } else {
            /* save in local storage */
            localStorage.setItem("auth", JSON.stringify(data));  
            /* save in context */
            setAuth(data);
            toast.success("Account Created, You are successfully log in, Welcome to ApnaGhar.com");
            navigate("/auth/login");
          }
  }

  return (
    <div className="account-activate">
        <div className="title"> Account Activation... </div>
          <br /><br /><br /><br />
          <div className="loading-bar">Loading</div>
        
    </div>
  )
}

export default AccountActivate
