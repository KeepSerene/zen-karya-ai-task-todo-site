// Library import
import { createBrowserRouter, RouteObject } from "react-router";

// Layout imports
import RootLayout from "@/layouts/RootLayout";

// Page imports
import HomePage from "@/pages/HomePage";
import RootErrorBoundary from "@/pages/RootErrorBoundary";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AuthSyncPage from "@/pages/AuthSyncPage";
import AppLayout from "@/layouts/AppLayout";
import InboxPage from "@/pages/InboxPage";

// Action imports
import appAction from "./actions/appAction";

// Loader imports
import inboxLoader from "./loaders/inboxLoader";

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
  {
    path: "auth-sync",
    element: <AuthSyncPage />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: "inbox",
    element: <InboxPage />,
    loader: inboxLoader,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
  {
    path: "/app",
    element: <AppLayout />,
    action: appAction,
    children: appRouteChildren,
  },
]);

export default router;
