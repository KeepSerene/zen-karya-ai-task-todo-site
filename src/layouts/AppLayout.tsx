// Component imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "@/components/AppSidebar";

// Library import
import { Outlet } from "react-router";

// Layout for paths starting with: /app
function AppLayout() {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <AppSidebar />

          <main className="flex-1">
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  );
}

export default AppLayout;
