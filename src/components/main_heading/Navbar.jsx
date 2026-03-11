import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaHome, FaSearch, FaBell, FaUser } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: <FaHome size={22} />, label: "Home" },
    { path: "/search", icon: <FaSearch size={22} />, label: "Search" },
    { path: "/reels", icon: <MdOutlineVideoLibrary size={22} />, label: "Reels" },
    { path: "/messages", icon: <BiMessageRounded size={22} />, label: "Message" },
    { path: "/notifications", icon: <FaBell size={22} />, label: "Notifications" },
    { path: "/profile", icon: <FaUser size={22} />, label: "Profile" },
  ];

  return (
    <div className="flex">
      <nav className="group h-screen bg-black text-white 
      w-20 hover:w-64 duration-300 flex flex-col p-4 fixed h-full">

        {/* Logo */}
        <div className="flex items-center gap-4 mb-10">
          <FaInstagram size={28}/>
          <span className="hidden group-hover:block text-xl font-bold">
            Instagram
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6">

          {navItems.map((item) => (
            <Link 
              to={item.path} 
              key={item.path}
              className={`flex items-center gap-4 cursor-pointer ${
                isActive(item.path) ? 'text-blue-500' : 'hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="hidden group-hover:block">{item.label}</span>
            </Link>
          ))}

          <div className="flex items-center gap-4 cursor-pointer mt-auto group-hover:block">
            <HiOutlineDotsHorizontal size={22}/>
            <span className="hidden group-hover:block">More</span>
          </div>

          {/* Logout Button */}
          <button 
            onClick={logout}
            className="flex items-center gap-4 cursor-pointer text-left w-full hover:text-red-400"
          >
            <span className="text-xl">↪</span>
            <span className="hidden group-hover:block">Logout</span>
          </button>

        </div>

      </nav>
    </div>
  );
}

export default Navbar;

