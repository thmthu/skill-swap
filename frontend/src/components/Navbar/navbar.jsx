import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../Toggle/ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black text-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logoNAB.png" alt="logo" className="w-12 h-12" />
        <div className="text-xl font-bold leading-tight">
          <span className="block">NAB Skillswap</span>
        </div>
      </div>

      {/* Nav & Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="flex gap-5 font-semibold text-xs md:text-sm">
          <Link to="/home" className="text-white hover:text-primary">
            Home
          </Link>
          <Link to="/resources" className="text-white hover:text-primary">
            Resources
          </Link>
          {isAuthenticated && (
            <Link to="/mynetwork" className="text-white hover:text-primary">
              My Network
            </Link>
          )}
        </nav>

        {/* Toggle theme */}
        <ThemeToggle />

        {/* Chat Icon */}
        <img
          src="/iconChat.png"
          className="icon-hover w-6 h-6 hover:opacity-80 cursor-pointer"
          alt="Chat"
          onClick={() => navigate("/chat")}
        />

        {/* Avatar */}
        <img
          src={user?.avatar || "/iconUser.png"}
          className="icon-hover w-6 h-6 rounded-full object-cover hover:opacity-80 cursor-pointer"
          alt="User Avatar"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
}
