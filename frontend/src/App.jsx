import { useRoutes } from "react-router-dom";
import { navRoutes } from "@/routes/NavRoutes";
import Navbar from "@/components/Navbar/Navbar";

function App() {
  const element = useRoutes(navRoutes);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-bg-light flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">{element}</main>
    </div>
  );
}

export default App;
