import Resizer from "react-image-file-resizer";
import axios from "axios";
import {Avatar} from "antd";
import { useAuth } from '../../context/auth';

const ProfileUpload = ({image, setImage, uploading, setUploading}) => {

  /* context */
  const [auth, setAuth] = useAuth();

  const handleImageUpload = async (e) => {
        try {
            let file = e.target.files[0];
            if(file){
                setUploading(true);
                new Promise(()=>{
                    Resizer.imageFileResizer(
                        file,  1080, 720, "JPEG",  100, 0,
                        async (uri) =>{
                            try {
                                console.log("UPLOAD Image:", uri);
                                const {data} = await axios.post("/upload-image",{
                                    image: uri,
                                });
                                setImage(data);
                                setUploading(false);
                            } catch (error) {
                                console.log(error)
                                setUploading(false);
                            }
                        },
                        "base64"
                    );
                });
            }
        } catch (err){
            console.log(err);
            setUploading(false);
        }
  }

  const deleteImageUpload = async (file) => {
    const ask = window.confirm("Delete Image?");
    if(!ask) return;
    setUploading(true);
    try {
        const {data} = await axios.post("/delete-image", photo);
        if(data?.ok){
            setImage(null);
            setUploading(false) 
        }        
    } catch (err){
        console.log(err)
        setUploading(false) 
    }
 }
  
  return (
    <>
        <label className="upload mb-3">
           {uploading ? "Processing..." : "Upload Photos"}
           <input hidden type="file" accept="image/*" onChange={handleImageUpload} />        
        </label>
        <div className="mb-3">
            
            {image?.Location ? (
                   <Avatar 
                   src={image?.Location} 
                   shape="square"
                   size="72"
                   className="mx-1"
                   onClick={()=> deleteImageUpload()}
                    />
               ) : ( 
                  ""
               )   
            }
        </div>
    
    </>
  )
}

export default ProfileUpload
