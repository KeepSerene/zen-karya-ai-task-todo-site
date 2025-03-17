// Component imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";

// Library import
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
        <AppSidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default AppLayout;
