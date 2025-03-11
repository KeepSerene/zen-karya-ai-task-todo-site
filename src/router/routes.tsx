// Library import
import { createBrowserRouter, RouteObject } from "react-router";

// Layout imports
import RootLayout from "@/layouts/RootLayout";

// Page imports
import HomePage from "@/pages/HomePage";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: rootRouteChildren,
  },
]);

export default router;
