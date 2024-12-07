import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FaBars, FaUserPlus, FaStore } from "react-icons/fa"; // Updated icon
import { useGlobalContext } from "../../store/context/globalContext.jsx";

export default function Navbar() {
  const { toggleSidebar } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if the current link is active
  const isActive = (path) =>
    location.pathname === path ? "text-secondary" : "";

  return (
    <nav className="fixed top-2 rounded-lg  z-30 w-mainWidth h-16 px-2 bg-primary flex items-center justify-center">
      <div className="flex items-center justify-between w-full py-8 text-white">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="relative p-2 transition-all duration-300 group "
          >
            <FaBars className="text-white hover:text-secondary" size={24} />
          </button>

          {/* Brand Name */}
          <p
            className="text-2xl font-semibold hidden md:block hover:cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Coherence
          </p>
        </div>

        {/* Logo for mobile */}
        <img
          src={logo}
          alt="logo"
          className="h-8 md:hidden hover:cursor-pointer"
          onClick={() => navigate("/home")}
        />

        <div className="flex items-center gap-6 ">
          {/* Subscription Icon */}
          <div
            className={`hover:cursor-pointer flex items-center justify-center p-2 transition-transform transform hover:scale-110  hover:border-secondary ${isActive(
              "/subscription"
            )}`}
            onClick={() => navigate("/subscription")}
          >
            <FaUserPlus
              size={24}
              className={`${isActive("/subscription")} hover:text-secondary`}
            />
          </div>

          {/* Store Icon */}
          <div
            className={`hover:cursor-pointer flex items-center justify-center p-2 transition-transform transform hover:scale-110  hover:border-secondary ${isActive(
              "/store"
            )}`}
            onClick={() => navigate("/store")}
          >
            <FaStore
              size={24}
              className={`${isActive("/store")} hover:text-secondary`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
