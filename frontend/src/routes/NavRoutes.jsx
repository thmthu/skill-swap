import { Navigate } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "@/components/ProtectedRoutes";
import Home from "@/pages/public/Home/page";
import Resources from "@/pages/public/Resources/page";

import Chat from "@/pages/private/Chat/page";
import MyNetwork from "@/pages/private/MyNetwork/page";
import Profile from "@/pages/private/Profile/page";

export const navRoutes = [
  {
    path: "/",
    element: <PublicRoute />,
    children: [{ path: "login", element: <div>Login Page</div> }],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "home", element: <Home /> },
      { path: "resources", element: <Resources /> },
      { path: "mynetwork", element: <MyNetwork /> },
      { path: "chat", element: <Chat /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];
