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
import TodayTasksPage from "@/pages/TodayTasksPage";
import UpcomingTasksPage from "@/pages/UpcomingTasksPage";
import CompletedTasksPage from "@/pages/CompletedTasksPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ProjectDetailErrorBoundary from "@/pages/ProjectDetailErrorBoundary";

// Action imports
import appAction from "./actions/appAction";
import projectsAction from "./actions/projectsAction";

// Loader imports
import inboxLoader from "./loaders/inboxLoader";
import todayTasksLoader from "./loaders/todayTasksLoader";
import upcomingTasksLoader from "./loaders/upcomingTasksLoader";
import completedTasksLoader from "./loaders/completedTasksLoader";
import projectsLoader from "./loaders/projectsLoader";
import projectDetailLoader from "./loaders/projectDetailLoader";
import appLoader from "./loaders/appLoader";

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
  {
    path: "today",
    element: <TodayTasksPage />,
    loader: todayTasksLoader,
  },
  {
    path: "upcoming",
    element: <UpcomingTasksPage />,
    loader: upcomingTasksLoader,
  },
  {
    path: "completed",
    element: <CompletedTasksPage />,
    loader: completedTasksLoader,
  },
  {
    path: "projects",
    element: <ProjectsPage />,
    action: projectsAction,
    loader: projectsLoader,
  },

  {
    path: "projects/:projectId",
    element: <ProjectDetailPage />,
    loader: projectDetailLoader,
    errorElement: <ProjectDetailErrorBoundary />,
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
    loader: appLoader,
    children: appRouteChildren,
  },
]);

export default router;
