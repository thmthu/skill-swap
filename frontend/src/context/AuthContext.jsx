"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // User state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsUserPreference, setNeedsUserPreference] = useState(null);
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false);
  const navigate = useNavigate();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      console.log("Current user data fetched:", currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      if (currentUser) {
        setUser(currentUser);
        const needsPreference = !currentUser.skills?.length || !currentUser.learn?.length;
        setNeedsUserPreference(needsPreference);
        return currentUser;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const url = new URL(window.location.href);
        if (url.pathname === '/auth' && (
            url.searchParams.get('reason') === 'session_expired' || 
            url.searchParams.get('state') === 'login'
          )) {
          console.log("Skipping auth check for login page");
          setLoading(false);
          setIsInitialAuthCheckDone(true);
          return;
        }
        
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            console.log("User loaded from localStorage:", parsedUser);
          } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            localStorage.removeItem('user');
          }
        }
        
        await fetchUserData();
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
        setIsInitialAuthCheckDone(true);
      }
    };

    checkUserLoggedIn();
  }, []);
  
  const refreshUserData = async () => {
    setIsRefreshing(true);
    try {
      const userData = await fetchUserData()
      return userData;
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const login = async (userData) => {
    setLoading(true);
    try {
      setUser(userData.user);
      
      
      const needsPreference = !userData.user?.skills?.length || !userData.user?.learn?.length;
      // console.log("Login data:", userData.user);
      // console.log("Skills:", userData.user?.skills, "Learn:", userData.user?.learn);
      // console.log("needsUserPreference after login:", needsPreference);
      setNeedsUserPreference(needsPreference);
      
      localStorage.setItem('user', JSON.stringify(userData.user));
      
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      return userData;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const userData = await authService.loginWithGoogle();
      setUser(userData);
      navigate("/home?message=Login successful");
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      navigate("/home?message=Logout successful");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isRefreshing, 
    login,
    loginWithGoogle,
    logout,
    register,
    isAuthenticated: !!user,
    needsUserPreference,
    refreshUserData, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
