import {
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.clear();

      navigate(
        "/login",
        {
          replace: true,
        }
      );
    };

  return (
    <aside className="w-72 h-screen bg-[#111827] border-r border-gray-800 fixed left-0 top-0">

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold text-blue-400">
          Community Forum
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Real-Time Discussion Platform
        </p>

      </div>

      <nav className="mt-8 px-4 flex flex-col gap-3">

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-gray-300 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Discussions */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-gray-300 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl"
        >
          <MessageSquare size={20} />
          Discussions
        </Link>

        {/* Create */}
        <Link
          to="/create-discussion"
          className="flex items-center gap-3 text-gray-300 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl"
        >
          <PlusCircle size={20} />
          Create Discussion
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-3 text-gray-300 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl"
        >
          <User size={20} />
          Profile
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="flex items-center gap-3 text-gray-300 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl"
        >
          <Bell size={20} />
          Notifications
        </Link>

      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-4 right-4">

        <button
          onClick={
            handleLogout
          }
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Navbar;