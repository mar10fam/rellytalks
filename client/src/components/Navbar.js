import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from '../context/AuthContext';
import { logout } from '../api/auth';

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
    logout().then((res) => {
      setUser(null);
      navigate("/");
    }).catch((err) => {
      console.error("Error while trying to logout: ", err);
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
              className="w-10 rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
            <div className="flex flex-col mt-[5vh] w-full items-center">
              <img
                alt="profile"
                className="rounded-full content-fit w-32"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
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