import { useState, useRef, useEffect } from "react";
import { Bell, Mail } from "lucide-react";

const Topbar = ({ user }) => {
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const fileInputRef = useRef(null);

  // Persist avatar in localStorage
  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        localStorage.setItem("userAvatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 bg-blue-400 shadow sticky top-0 z-20">
      {/* LEFT: Hamburger (mobile) + Dashboard title */}
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Hamburger menu for mobile only */}
        <button className="md:hidden text-2xl text-white mr-2">☰</button>
        <h1 className="text-white text-lg md:text-2xl font-semibold truncate">
          📊 Library Dashboard
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex-1 md:flex-none mt-2 md:mt-0">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* ICONS + USER */}
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-blue-600 transition">
          <Bell size={20} className="text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Email */}
        <a
          href={`mailto:${user?.email}`}
          className="p-2 rounded-full hover:bg-blue-600 transition"
        >
          <Mail size={20} className="text-white" />
        </a>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer overflow-hidden"
            onClick={handleAvatarClick}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.[0] || "U"
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Name + Email */}
          <div className="hidden sm:flex flex-col text-white text-sm">
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className="text-xs">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
