import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

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

  // Mock logged-in user
  const [user] = useState({
    name: "Librarian",
    email: "librarian22@gmail.com",
    avatar: null,
    role: "staff", // "student" or "staff"
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        role={user.role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 md:ml-64">
        {/* MOBILE HEADER */}
        <div className="flex items-center gap-3 mb-4 md:hidden bg-blue-400">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl m-4 text-white"
          >
            ☰
          </button>
          <h1 className="font-semibold text-lg">Library Dashboard</h1>
          <div
            className="w-10 h-10 bg-blue-400 text-white rounded-full flex right-0 absolute  justify-center font-semibold cursor-pointer overflow-hidden"
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

        {/* DESKTOP TOPBAR */}
        <div className="hidden md:block sticky top-0 z-10">
          <Topbar user={user} />
        </div>

        <div className="p-6 bg-gray-100 min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
