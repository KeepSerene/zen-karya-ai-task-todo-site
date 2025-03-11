// Library import
import { createBrowserRouter, RouteObject } from "react-router";

// Layout imports
import RootLayout from "@/layouts/RootLayout";

// Page imports
import HomePage from "@/pages/HomePage";
import RootErrorBoundary from "@/pages/RootErrorBoundary";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
]);

export default router;
