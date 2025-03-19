// Component imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "@/components/AppSidebar";

// Library imports
import { Outlet, useNavigation } from "react-router";
import { cn } from "@/lib/utils";

// Layout for paths starting with: /app
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <AppSidebar />

          <main
            className={cn(
              "flex-1",
              isLoading && "opacity-50 pointer-events-none"
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  );
}

export default AppLayout;
