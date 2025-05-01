import { useRoutes } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

function App() {
  const element = useRoutes(navRoutes);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-bg-light flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-1 p-6">{element}</main>
    </div>
  );
}

export default App;
