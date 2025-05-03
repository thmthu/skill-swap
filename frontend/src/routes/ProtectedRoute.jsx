import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/Loading/LoadingScreen";

export function PrivateRoute() {
  const { isAuthenticated, loading, needsUserPreference } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  if (loading) return <LoadingScreen />;
  
  if (!isAuthenticated && !isHomePage) {
    return <Navigate to="/auth?state=login" replace />;
  }

  if (isAuthenticated && needsUserPreference && !window.location.pathname.includes("user-preference")) {
    return <Navigate to="/user-preference" replace />;
  }

  return <Outlet />;
}
