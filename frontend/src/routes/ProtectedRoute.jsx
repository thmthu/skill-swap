import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function PrivateRoute() {
  const { isAuthenticated, loading, needsUserPreference } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth?state=login" replace />;

  if (needsUserPreference && !window.location.pathname.includes("user-preference")) {
    return <Navigate to="/user-preference" replace />;
  }

  return <Outlet />;
}
