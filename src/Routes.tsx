import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import View from "./screens/View";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Logout from "./screens/Logout";
import Login from "./screens/Login";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return <Outlet />;
};

const Routes = () => {
  const routesForPublic = [
    {
      path: "/view/:postId",
      element: <View />,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
