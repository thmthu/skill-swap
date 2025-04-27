import Navbar from "./components/Navbar/navbar";
import { navRoutes } from "./routes/NavRoutes";
import { useRoutes } from "react-router-dom";
function App() {
  const element = useRoutes(navRoutes);
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-bg-light">
      <Navbar />

      {/* Nội dung chính */}
      <div className="p-10">
        <h1 className="text-3xl font-bold">Hello</h1>
      </div>
    </div>
  );
}

export default App;
