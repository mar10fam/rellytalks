import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    console.log(currentPath);

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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default Navbar