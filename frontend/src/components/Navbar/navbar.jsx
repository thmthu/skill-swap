import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../Toggle/ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return null; // hoặc <div>Loading...</div>
  }

  console.log("Current User:", user);

  return (
    <header className="w-full bg-gradient-to-l from-gradient-start via-gradient-mid to-gradient-end text-text-dark px-6 py-2 md:px-8 md:py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logoNAB.png" alt="logo" className="w-12 h-12" />
        <div className="font-heading text-h1 md:text-display font-bold leading-tight">
          <span className="block">NAB Skillswap</span>
        </div>
      </div>

      {/* Nav & Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="flex gap-5 font-semibold text-btn2 md:text-btn1 font-heading">
          <Link
            to="/home"
            className="text-text-dark hover:text-primary-light transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/resources"
            className="text-text-dark hover:text-primary-light transition duration-300"
          >
            Resources
          </Link>
          {isAuthenticated && (
            <Link
              to="/mynetwork"
              className="text-text-dark hover:text-primary-light transition duration-300"
            >
              My Network
            </Link>
          )}
        </nav>

        {/* Toggle theme */}
        <ThemeToggle />

        {/* Chat and User Actions */}
        {isAuthenticated ? (
          <>
            {/* Chat Icon */}
            <img
              src="/iconChat.png"
              className="icon-hover w-6 h-6 hover:opacity-80 cursor-pointer transition duration-300"
              alt="Chat"
              onClick={() => navigate("/chat")}
            />

            {/* Avatar */}
            <img
              src={user?.avatar || "/iconUser.png"}
              className="icon-hover w-6 h-6 rounded-full object-cover hover:opacity-80 cursor-pointer transition duration-300"
              alt="User Avatar"
              onClick={() => navigate("/profile")}
            />
          </>
        ) : (
          <div className="flex gap-2 font-semibold text-btn2 md:text-btn1 font-heading">
            <button
              onClick={() => navigate("/login")}
              className="text-text-dark hover:text-primary-light transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-text-dark hover:text-primary-light transition duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
