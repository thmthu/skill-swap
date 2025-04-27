import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Hook lấy thông tin login

// Dành cho trang Public (login/signup)
export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Nếu đã đăng nhập mà còn vào login/signup ➔ redirect về home
    return <Navigate to="/home" replace />;
  }

  // Nếu chưa đăng nhập ➔ cho phép vào
  return <Outlet />;
}

// Dành cho trang Private (home/chat/profile)
export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa xác định được trạng thái
  }

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập ➔ redirect về login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập ➔ cho phép vào
  return <Outlet />;
}
