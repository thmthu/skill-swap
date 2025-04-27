import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../Toggle/ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth(); // Lấy cả user info nếu cần

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
          <a href="#" className="text-white hover:text-primary">
            Home
          </a>
          <a href="#" className="text-white hover:text-primary">
            Resources
          </a>

          {/* Chỉ hiện My Network nếu user đã đăng nhập */}
          {isAuthenticated && (
            <a href="#" className="text-white hover:text-primary">
              My Network
            </a>
          )}
        </nav>

        {/* Toggle */}
        <ThemeToggle />

        {/* Icons */}
        <img
          src="/iconChat.png"
          className="icon-hover w-6 h-6 hover:opacity-80"
          alt="Chat"
        />
        {/* Avatar user */}
        {isAuthenticated ? (
          <img
            src={user?.avatar || "/iconUser.png"} // Nếu có avatar user thì show, không thì dùng default icon
            className="icon-hover w-6 h-6 rounded-full object-cover hover:opacity-80"
            alt="User Avatar"
          />
        ) : (
          <img
            src="/iconUser.png"
            className="icon-hover w-6 h-6 rounded-full hover:opacity-80"
            alt="Default User Icon"
          />
        )}
      </div>
    </header>
  );
}
