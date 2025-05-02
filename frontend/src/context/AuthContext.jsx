"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsUserPreference, setNeedsUserPreference] = useState(null);
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        const needsPreference =
          !currentUser.skills?.length || !currentUser.learn?.length;
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
        if (
          url.pathname === "/auth" &&
          (url.searchParams.get("reason") === "session_expired" ||
            url.searchParams.get("state") === "login")
        ) {
          setLoading(false);
          setIsInitialAuthCheckDone(true);
          return;
        }

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
          } catch (e) {
            localStorage.removeItem("user");
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
    setLoading(true);
    try {
      const userData = await fetchUserData();
      return userData;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const checkUserPreference = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const needsPreference =
          !currentUser.skills?.length || !currentUser.learn?.length;
        setNeedsUserPreference(needsPreference);

        const currentPath = window.location.pathname;

        // ✅ Chỉ redirect nếu thiếu và không đang ở /user-preference
        if (needsPreference && currentPath !== "/user-preference") {
          navigate("/user-preference");
        }

        // ✅ Nếu login xong mà ở /auth, thì đi thẳng về /home
        if (!needsPreference && currentPath === "/auth") {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error checking user preferences", error);
      }
    };

    checkUserPreference();
  }, [user]);

  const login = async (userData) => {
    setLoading(true);
    try {
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
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
      localStorage.removeItem("user");
      navigate("/home?message=Logout successful");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser, // ✅ THÊM DÒNG NÀY ĐỂ CẬP NHẬT USER TỪ COMPONENT KHÁC
    loading,
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
