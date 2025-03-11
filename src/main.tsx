// CSS import
import "./index.css";

// React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Library import
import { RouterProvider } from "react-router";

// Router import
import router from "./router/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
