import { useRoutes } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { SocketProvider } from "./context/SocketContext";
import Header from "./components/Header/Header";

function App() {
	const element = useRoutes(navRoutes);
	const { theme } = useTheme();

	return (
		<SocketProvider>
			<div className="min-h-screen w-screen overflow-x-hidden bg-bg-light flex flex-col">
				<Toaster />
				<Navbar />
				<main className="flex-1">{element}</main>
			</div>
		</SocketProvider>
	);
}

export default App;
