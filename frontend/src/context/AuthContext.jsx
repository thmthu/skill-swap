// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log("✅ User Info:", res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("❌ Error fetching user:", err);
        setUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
