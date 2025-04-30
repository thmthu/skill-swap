
import "./App.css";
import MyNetworkPage from "./pages/private/MyNetwork/page";
import ResourcePage from "./pages/public/Resources/page";
import { useRoutes } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

function App() {
  const element = useRoutes(navRoutes);
  const { theme } = useTheme();
	return (
		<div>
			{/* <ColorTest /> */}
			{/* <MyNetworkPage /> */}
      <ResourcePage />
   
		</div>
	);
}

export default App;
