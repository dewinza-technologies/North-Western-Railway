import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/");
  };

  const goProfile = () => {
    setOpen(false);
    navigate("/dashboard/profile");
  };

  const goSettings = () => {
    setOpen(false);
    navigate("/dashboard/settings");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b flex items-center gap-2">
          <img src="/nwr-logo.png" className="h-8" />
          <div className="text-sm font-semibold leading-tight">
            North Western Railway
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2 text-sm">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/create"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Create Project
          </NavLink>

          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`
            }
          >
            All Projects
          </NavLink>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
          <div className="font-medium text-gray-700">
            Project Monitoring System
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <div className="text-sm text-right">
                <div className="font-medium">Railway User</div>
                <div className="text-xs text-gray-500">
                  NWR Employee
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                R
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg">
                <div className="p-3 border-b">
                  <div className="text-sm font-medium">
                    Railway User
                  </div>
                  <div className="text-xs text-gray-500">
                    user@nwr.gov.in
                  </div>
                </div>

                <button
                  onClick={goProfile}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={goSettings}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}