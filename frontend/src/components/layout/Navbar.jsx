import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // If user not loaded yet, don’t render navbar
  if (!user) return null;

  const isAdmin = user.role === "admin";

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* Left: App Name */}
        <Link
          to={isAdmin ? "/dashboard" : "/"}
          className="text-xl font-semibold tracking-tight text-indigo-600"
        >
          User Management
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* ✅ Admin-only links */}
          {isAdmin && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/users"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Users
              </Link>
            </>
          )}

          {/* ❌ User-specific links removed */}

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-800">
                {user.fullName}
              </span>
              <span
                className={`text-xs font-medium capitalize ${
                  isAdmin ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                {user.role}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3">
          {/* ✅ Admin-only links */}
          {isAdmin && (
            <>
              <Link
                to="/dashboard"
                className="block text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/users"
                className="block text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Users
              </Link>
            </>
          )}

          {/* ❌ User-specific links removed */}

          <div className="pt-3 border-t text-sm text-gray-600">
            <div className="font-medium">{user.fullName}</div>
            <div className="capitalize">{user.role}</div>
          </div>

          <button
            onClick={onLogout}
            className="block text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
