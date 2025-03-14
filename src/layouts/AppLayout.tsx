// Component imports
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";

// Library import
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
        <AppSidebar />

        <SidebarTrigger type="button" />

        <p>AppLayout</p>

        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default AppLayout;
