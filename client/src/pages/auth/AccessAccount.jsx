import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import {useAuth} from "../../context/auth";

const AccessAccount= () => {
  /* context */
  const [auth, setAuth] = useAuth();
  /* useParams hook */  
  const {token} = useParams();
  const navigate = useNavigate();
  /* useEffect hook */
  useEffect(()=>{
    if (token) requestForAccess();
  }, [token])
  const requestForAccess = async () => {
       try {
          const {data} = await axios.post(`/access-account`, { resetCode: token});
          if(data?.error){ 
             toast.error(data.error);
          } else {
            /* save in local storage */
            localStorage.setItem("auth", JSON.stringify(data));  
            /* save in context */
            setAuth(data);
            toast.success("Please update your password in Profile page");
            navigate("/");
          }
       } catch (err){
            console.log(err);
            toast.error("Password Request failed…Try again");
       }
  }

  return (
    <div className="account-activate">
        <div className="title"> Please wait... </div>
          <br /><br />
          <div className="loading-bar">Loading</div>        
    </div>
  )
}

export default AccessAccount
