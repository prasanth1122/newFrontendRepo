import {
  FaHome,
  FaStore,
  FaBook,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useGlobalContext } from "../../store/context/globalContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Function to determine if the current link is active
  const isActive = (path) =>
    location.pathname === path ? "text-secondary" : "";
  const { isSidebarOpen, toggleSidebar } = useGlobalContext();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  }

  function onClick(path) {
    toggleSidebar(); // Close the sidebar when any link is clicked
    navigate(path); // Navigate to the corresponding path
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      {/* Sidebar */}
      <div className="absolute z-50 left-2 w-16 md:w-48 lg:w-sidebar h-[98%] bg-primary py-4 flex flex-col items-center md:items-start text-white rounded-lg shadow-lg  border-gray-300">
        {/* Top part - Company name */}
        <p className="text-xl md:text-2xl font-bold mb-6 px-4 md:px-8 hidden md:block">
          Coherence
        </p>

        {/* Middle part - Links */}
        <div className="flex flex-col items-center md:items-start gap-2 lg:gap-4 w-full mt-8">
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/home")}
          >
            <FaHome />
            <span className="hidden md:inline">Home</span>
          </div>
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/store")}
          >
            <FaStore />
            <span className="hidden md:inline">Store</span>
          </div>
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/library")}
          >
            <FaBook />
            <span className="hidden md:inline">Library</span>
          </div>
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/subscription")}
          >
            <FaBook />
            <span className="hidden md:inline">Subscription</span>
          </div>
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/analytics")}
          >
            <FaChartLine />
            <span className="hidden md:inline">Analytics</span>
          </div>
        </div>

        {/* Bottom part - Profile and Logout */}
        <div className="mt-auto flex flex-col items-center md:items-start gap-4 w-full">
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={() => onClick("/profile")}
          >
            <FaUserCircle />
            <span className="hidden md:inline">Profile</span>
          </div>
          <div
            className="flex justify-center md:justify-start px-4 md:px-8 items-center gap-4 w-full py-2 hover:bg-secondary hover:font-bold text-lg hover:cursor-pointer"
            onClick={logout}
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={toggleSidebar} // Close the sidebar on click
      ></div>
    </div>
  );
}
