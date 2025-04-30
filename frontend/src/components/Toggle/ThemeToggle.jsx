import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div
      onClick={toggleTheme}
      className="w-12 h-6 rounded-full bg-[#979797] flex items-center px-1 cursor-pointer transition-all duration-300"
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md flex items-center justify-center transition-all duration-500 transform ${
          isDark ? "translate-x-6 bg-black" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <FaMoon className="text-white w-3 h-3" />
        ) : (
          <FaSun className="text-black w-3 h-3" />
        )}
      </div>
    </div>
  );
}
