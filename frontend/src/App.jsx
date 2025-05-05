import { useRoutes, useLocation } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { SocketProvider } from "./context/SocketContext";
import Footer from "./components/Footer/footer";

function App() {
	const element = useRoutes(navRoutes);
	const { theme } = useTheme();
	const location = useLocation();
	const { pathname } = location;

	// Các route cần ẩn Navbar
	const hideNavbarRoutes = ["/auth", "/user-preference"];
	const hideFooterRoutes = ["/auth", "/user-preference", "/chat", "/profile"];
	const shouldHideNavbar = hideNavbarRoutes.some((route) =>
		pathname.startsWith(route)
	);

	const shouldHideFooter = hideFooterRoutes.some((route) =>
		pathname.startsWith(route)
	);
	return (
		<SocketProvider>
			<div
				className={`min-h-screen w-screen overflow-x-hidden relative transition-colors duration-300 
          bg-white text-black dark:bg-[#0c111c] dark:text-white`}
			>
				<Toaster />

				{/* ❌ Ẩn Navbar nếu đang ở các trang auth hoặc preference */}
				{!shouldHideNavbar && <Navbar />}

				{/* 📄 Nội dung chính */}
				<main className={`${shouldHideNavbar ? "pt-12" : "pt-20"}`}>
					{element}
				</main>
				{!shouldHideFooter && <Footer />}
			</div>
		</SocketProvider>
	);
}

export default App;
