import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Hook lấy thông tin login

// Dành cho trang Public (login/signup)
export function PublicRoute() {
  return <Outlet />;
}

const PrivateRoute = () => {
  const { isAuthenticated, needsUserPreference } = useAuth();
  if (needsUserPreference && !window.location.pathname.includes("user-preference")) {
    return <Navigate to="/user-preference" replace />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth?state=login" replace />; 
};

export default PrivateRoute;
