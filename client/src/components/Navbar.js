import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from '../context/AuthContext';
import { logout } from '../api/auth';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { nanoid } from "nanoid";
import { editPfp } from '../api/user';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [profilePanel, setProfilePanel] = useState(false);
  
  const togglePanel = () => {
    setProfilePanel(!profilePanel);
  }

  const closePanel = () => {
    setProfilePanel(false);
  }

  const logoutHandler = () => {
    logout().then(() => {
      setUser(null);
      navigate("/");
    }).catch((err) => {
      console.error("Error while trying to logout: ", err);
    });
  }
  
  const handleFileUpload = (e) => {
    const pfp = e.target.files[0];
    if(!pfp) return;
    const imageRef = ref(storage, `${pfp.name + nanoid(10)}`);
    uploadBytes(imageRef, pfp).then(() => {
      getDownloadURL(imageRef).then((url) => {
        const body = {
          userId: user._id,
          pfp: url
        }
        const oldPfp = user.pfp;
        editPfp(body).then((updatedUser) => {
          setUser(updatedUser);
          // if the previous pfp isn't the default one, delete it
          if(oldPfp !== "https://firebasestorage.googleapis.com/v0/b/rellytalks-a87fc.appspot.com/o/nopfp.jpg?alt=media&token=093cdedc-6747-4878-8725-bcacacb04272") {
            const oldPfpRef = ref(storage, oldPfp.split("?")[0]); // removes the query string for ref 
            deleteObject(oldPfpRef).catch((err) => {
              console.error("Caught while trying to delete old pfp: ", err);
            })
          }
        }).catch((err) => {
          console.error("Caught while trying to update user: ", err);
        });
      }).catch((err) => {
        console.error("Caught while trying to get the image url: ", err);
      });
    }).catch((err) => {
      console.error("Caught while trying to upload image to firebase: ", err);
    });
  }

  if(!user) return null;

  return (
    <>
      <div className="navbar bg-base-100 min-h-[10vh]">
        <div className="navbar-start">{/* Start of navbar */}</div>
        <div className="navbar-center min-w-[40%] lg:flex">
          {/* Center of navbar */}
          <div className="relative w-[100%] bg-neutral text-white flex rounded-full overflow-hidden">
            <div
              className={`flex-1 py-2 pl-[5%] text-center cursor-pointer ${
                currentPath === "/home"
                  ? "bg-[#7A4DC4]"
                  : "hover:bg-secondary"
              }`}
              onClick={() => navigate("/home")}
            >
              Home
            </div>
            <div className="absolute inset-0 m-auto w-10 h-10 bg-[#7A4DC4] rounded-full"></div>
            <div
              className={`flex-1 py-2 pr-[5%] text-center cursor-pointer ${
                currentPath === "/messages"
                  ? "bg-[#7A4DC4]"
                  : "hover:bg-secondary"
              }`}
              onClick={() => navigate("/messages")}
            >
              Messages
            </div>
          </div>
        </div>
        <div className="navbar-end">
          {/* End of navbar */}
          <div className="btn btn-ghost btn-circle avatar" onClick={togglePanel}>
            <img
              alt="profile"
              className="w-10 h-10 object-cover object-center ring-gray-300 ring-2 rounded-full"
              src={user.pfp}
            />
          </div>
          {/* Dark overlay */}
          {profilePanel && (
            <div
              className="fixed inset-0 bg-black z-10 bg-opacity-50 transition-opacity duration-300"
              onClick={closePanel}
            ></div>
          )}
          <div
            className={`fixed top-0 right-0 z-20 w-96 h-full rounded-l-lg bg-white text-black p-4 transition-transform duration-300 ease-in-out ${
              profilePanel ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Panel content */}
            <div className="absolute top-3 right-3 cursor-pointer" onClick={closePanel}>
              <CloseIcon fontSize="large" />
            </div>
            <div className="flex flex-col gap-4 mt-[5vh] w-full items-center">
              <div className="relative group cursor-pointer" onClick={() => document.getElementById("fileInput").click()}>
                <img
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover object-center ring-gray-300 ring-2 transition duration-200 ease-in-out group-hover:grayscale group-hover:opactiy-50 cursor-pointer"
                  src={user.pfp}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-0 opacity-0 underline group-hover:opacity-100 transition duration-200 ease-in-out">
                  Edit
                </span>
                <input 
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>
              <h2 className="font-bold">{user.username}</h2>
              <p>{user.description}</p>
            </div>
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <button className="btn btn-primary w-[50%]" onClick={logoutHandler}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar