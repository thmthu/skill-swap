import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div className="w-full min-h-screen bg-bg-light">
      <Navbar />

      {/* Nội dung chính */}
      <div className="p-10">
        <h1 className="text-3xl font-bold">Hello</h1>
      </div>
    </div>
  );
}

export default App;
