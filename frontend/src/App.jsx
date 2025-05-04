import { useRoutes, useLocation } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const element = useRoutes(navRoutes);
  const { theme } = useTheme();
  const location = useLocation();
  const { pathname } = location;

  // Các route cần ẩn Navbar
  const hideNavbarRoutes = ["/auth", "/user-preference"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <SocketProvider>
      <div className="min-h-screen w-screen overflow-x-hidden bg-bg-light relative">
        <Toaster />

        {/* ❌ Ẩn Navbar nếu đang ở các trang auth hoặc preference */}
        {!shouldHideNavbar && <Navbar />}

        {/* 📄 Nội dung chính */}
        <main
          className={`
            overflow-y-auto
            ${shouldHideNavbar ? "pt-12" : "pt-20"}
          `}
        >
          {element}
        </main>
      </div>
    </SocketProvider>
  );
}

export default App;
