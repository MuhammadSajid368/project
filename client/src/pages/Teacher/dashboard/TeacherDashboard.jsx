import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import MetaData from "../../../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../../../layout/topBar";

const TeacherProfile = () => {
  const [auth, setAuth] = useAuth();

  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user?.username);
      setFirst_name(auth.user?.first_name);
      setLast_name(auth.user?.last_name);
      setEmail(auth.user?.email);
      setAddress(auth.user?.address);
      setImage(auth.user?.image);
    }
  }, [auth.user]);

  const handleProfileBtn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-profile", {
        username,
        first_name,
        last_name,
        email,
        address,
        image,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        let dataFromLS = JSON.parse(localStorage.getItem("auth"));
        dataFromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(dataFromLS));
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error uploading image");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <MetaData title={`Profile`} />
      <Sidebar />
      <div className="w-full">
        <TopBar />
        {/* <TeacherProfile /> */}
      </div>
    </div>
  );
};

export default TeacherProfile;
