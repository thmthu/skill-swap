import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute } from "./AuthRoutes";
import { PrivateRoute } from "./ProtectedRoute";
import path from "path";

const HomePage = lazy(() => import("@/pages/public/Home/page"));
const ResourcesPage = lazy(() => import("@/pages/public/Resources/page"));
const LoginPage = lazy(() => import("@/pages/public/LogIn/page"));
const SignupPage = lazy(() => import("@/pages/public/SignUp/page"));
const ChatPage = lazy(() => import("@/pages/private/Chat/page"));
const ProfilePage = lazy(() => import("@/pages/private/Profile/page"));
const MyNetworkPage = lazy(() => import("@/pages/private/MyNetwork/page"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFound/page"));
const AuthPage = lazy(() => import("@/pages/public/AuthPage"));
const UserPreferencePage = lazy(() => import("@/pages/private/UserPreference/page"));
// const LoadingScreen = lazy(() => import("@/components/Loading/LoadingScreen"));

export const navRoutes = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <HomePage /> },
  { path: "/resources", element: <ResourcesPage /> },
  // { path: "/loading", element: <LoadingScreen /> },
  {
    element: <AuthRoute />,
    children: [
      { path: "/auth", element: <AuthPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "/user-preference", element: <UserPreferencePage /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/mynetwork", element: <MyNetworkPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
  // {
  //   path: "/test-private",
  //   element: <PrivateRoute><div>Test private content</div></PrivateRoute>,
  // }
];
