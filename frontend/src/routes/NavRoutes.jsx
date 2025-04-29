import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute } from "./AuthRoutes";
import { PrivateRoute } from "./ProtectedRoute";

const HomePage = lazy(() => import("@/pages/public/Home/page"));
const ResourcesPage = lazy(() => import("@/pages/public/Resources/page"));
const LoginPage = lazy(() => import("@/pages/public/LogIn/page"));
const SignupPage = lazy(() => import("@/pages/public/SignUp/page"));
const ChatPage = lazy(() => import("@/pages/private/Chat/page"));
const ProfilePage = lazy(() => import("@/pages/private/Profile/page"));
const MyNetworkPage = lazy(() => import("@/pages/private/MyNetwork/page"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFound/page"));

export const navRoutes = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <HomePage /> },
  { path: "/resources", element: <ResourcesPage /> },
  {
    element: <AuthRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: "/chat", element: <ChatPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/mynetwork", element: <MyNetworkPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
