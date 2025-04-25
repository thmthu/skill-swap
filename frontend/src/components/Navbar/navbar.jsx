import ThemeToggle from "../Toggle/ThemeToggle"; // điều chỉnh đường dẫn nếu khác

export default function Navbar() {
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
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            Resources
          </a>
          <a href="#" className="text-white">
            My Network
          </a>
        </nav>

        {/* Toggle */}
        <ThemeToggle />

        {/* Icons */}
        <img src="/iconChat.png" className="icon-hover w-6 h-6" alt="Chat" />
        <img
          src="/iconUser.png"
          className="icon-hover w-6 h-6 rounded-full"
          alt="User"
        />
      </div>
    </header>
  );
}
