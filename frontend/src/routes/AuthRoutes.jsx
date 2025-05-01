import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function AuthRoute() {
  const { isAuthenticated, needsUserPreference } = useAuth();

  if (isAuthenticated) {
    if (needsUserPreference) {
      return <Navigate to="/user-preference" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
