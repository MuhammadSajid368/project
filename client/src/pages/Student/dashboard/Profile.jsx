import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { useAuth } from "../../../context/auth";
import Sidebar from "./Sidebar";
import { AiOutlineCamera } from "react-icons/ai";

const Profile = () => {
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
      localStorage.setItem("auth", JSON.stringify({ ...auth, user: data }));
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        let dataFromLS = JSON.parse(localStorage.getItem("auth"));
        dataFromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(dataFromLS));
        setLoading(false);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(file);
      toast.success("Image uploaded successfully");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to upload image");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h5 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            User Profile Update
          </h5>
          <div className="text-light my_profile">
            <div className="wrapper space-y-4">
              <div className="flex flex-col items-center relative">
                <div
                  style={{ position: "relative", marginLeft: "40%" }}
                  className=""
                >
                  <img
                    src={`http://localhost:8080/${auth.user.image}`}
                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                    alt="image"
                  />
                  <div
                    className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] left-28"
                    style={{ zIndex: 1 }}
                  >
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImage} // Example onChange handler
                    />
                    <label htmlFor="image">
                      <AiOutlineCamera />
                    </label>
                  </div>
                </div>
              </div>
              <form onSubmit={handleProfileBtn} className="space-y-4">
                <div className="input-box">
                  <input
                    required
                    placeholder="Update your Username"
                    type="text"
                    value={username}
                    onChange={(e) =>
                      setUsername(slugify(e.target.value.toLowerCase()))
                    }
                    className="input-field w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="input-box">
                  <input
                    required
                    placeholder="Enter your First Name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    className="input-field w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="input-box">
                  <input
                    required
                    placeholder="Enter your Last Name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    className="input-field w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="input-box">
                  <input
                    required
                    placeholder="Enter your Email"
                    type="text"
                    value={email}
                    disabled
                    className="input-field w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="input-box">
                  <input
                    required
                    placeholder="Enter your Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  className="btn bg-blue-500 text-white w-full py-2 rounded"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
