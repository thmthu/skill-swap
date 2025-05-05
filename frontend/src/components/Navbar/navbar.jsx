import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../Toggle/ThemeToggle";
import UserDropdown from "../Dropdown/UserDropdown";
import ChatIcon from "../Chat/ChatIcon";

export default function Navbar() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-l from-gradient-start via-gradient-mid to-gradient-end px-6 md:px-8 flex items-center justify-between shadow text-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link to="/home" className="logo-link flex items-center gap-3">
          <img src="/logoNAB.png" alt="logo" className="w-12 h-12" />
          <div className="font-heading text-h1 md:text-display font-bold leading-tight">
            <span className="block">NAB Skillswap</span>
          </div>
        </Link>
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="flex gap-5 font-semibold text-btn2 md:text-btn1 font-heading">
          <Link
            to="/home"
            className="text-white hover:text-primary-light transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/resources"
            className="text-white hover:text-primary-light transition duration-300"
          >
            Resources
          </Link>
          {isAuthenticated && (
            <Link
              to="/mynetwork"
              className="text-white hover:text-primary-light transition duration-300"
            >
              My Network
            </Link>
          )}
        </nav>

        {/* Toggle Theme */}
        <ThemeToggle />

        {/* User & Chat or Auth buttons */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <ChatIcon />
            <UserDropdown
              avatarUrl={user?.avatar || "/iconUser.png"}
              username={user?.username || "User"}
            />
          </div>
        ) : (
          <div className="flex gap-2 font-semibold text-btn2 md:text-btn1 font-heading">
            <button
              onClick={() => navigate("/auth?state=login")}
              className="text-white hover:text-primary-light transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth?state=signup")}
              className="text-white hover:text-primary-light transition duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
