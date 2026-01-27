import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { Home, Book, Users, LogOut, Settings, Download, Plus, FileQuestionIcon } from "lucide-react";

const menu = {
  student: [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Search Books", path: "/students/search", icon: Book },
    { name: "My Books", path: "/students/my-books", icon: Users },
  ],
  staff: [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Add Books", path: "/addbooks", icon: Plus },
    { name: "Operations", path: "/operation", icon: Users },
    { name: "Assign Staff", path: "/assign-staff", icon: Download },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Overdue", path: "/overduelist", icon: Book },
    { name: "Help", path: "/help", icon: FileQuestionIcon },
  ],
};

const Sidebar = ({ role = "student", open, onClose, user }) => {
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const fileInputRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Update isDesktop on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP slide animation
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isDesktop) {
      // Always show sidebar on desktop
      gsap.set(sidebarRef.current, { x: 0 });
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    } else {
      // Mobile: slide and overlay
      gsap.to(sidebarRef.current, {
        x: open ? 0 : "-100%",
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(overlayRef.current, {
        opacity: open ? 0.5 : 0,
        pointerEvents: open ? "auto" : "none",
        duration: 0.4,
      });
    }
  }, [open, isDesktop]);

  // Swipe-to-close for mobile
  useEffect(() => {
    if (isDesktop) return; // skip on desktop

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    let startX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0].clientX < startX - 60) {
        onClose();
      }
    };

    sidebar.addEventListener("touchstart", handleTouchStart);
    sidebar.addEventListener("touchmove", handleTouchMove);

    return () => {
      sidebar.removeEventListener("touchstart", handleTouchStart);
      sidebar.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onClose, isDesktop]);

    

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
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-blue-700 opacity-0 pointer-events-none z-40"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 z-50 h-full w-64 bg-blue-400  text-white"
      >
        {/* Header */}
        <div className="p-4 text-xl font-bold ">Library Dashboard</div>

         {/* User Avatar */}
        <div className="flex items-center gap-2 mb-8 px-4">
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
          <div className=" sm:flex flex-col text-white text-sm">
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className="text-xs">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-1">
          {menu[role].map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive ? "bg-red-600" : "hover:bg-gray-700"
                }`
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Logout */}
        <div className="absolute bottom-4 px-4 w-full">
          <button className="flex items-center gap-2 bg-red-700 text-white  p-2 rounded hover:bg-red-800 hover:scale-105 transition cursor-pointer"
          path="/logout"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
