import "./App.css";
import LoginPage from "./pages/public/LogIn/page";
import MyNetworkPage from "./pages/private/MyNetwork/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, PublicRoute } from "./routes/AuthRoutes";
import Home from "@/pages/public/Home/page";
import Login from "@/pages/public/LogIn/page";
import Signup from "@/pages/public/SignUp/page";
import AuthPage from "@/pages/public/AuthPage";

function ColorTest() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-h2 font-heading">🎨 Color Test</h1>

      <p className="text-primary">text-primary</p>
      <p className="text-primary-dark">text-primary-dark</p>
      <p className="text-primary-medium">text-primary-medium</p>
      <p className="text-primary-light">text-primary-light</p>
      <p className="text-primary-extra-light">text-primary-extraLight</p>

      <p className="text-secondary-red-pink">text-secondary-redPink</p>
      <p className="text-secondary-light-pink">text-secondary-lightPink</p>

      <p className="text-semantic-green">text-semantic-green</p>
      <p className="text-semantic-blue">text-semantic-blue</p>
      <p className="text-semantic-orange">text-semantic-orange</p>

      <div className="w-full h-16 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white flex items-center justify-center rounded">
        Gradient Background
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
