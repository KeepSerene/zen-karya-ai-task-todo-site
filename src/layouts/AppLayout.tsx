// Type import
import type { Models } from "appwrite";

// Context provider import
import { ProjectsContextProvider } from "@/contexts/ProjectsContextProvider";

// Component imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "@/components/AppSidebar";

// Library imports
import { Outlet, useLoaderData, useNavigation } from "react-router";

// Util import
import { cn } from "@/lib/utils";

// Layout for paths starting with: /app
function AppLayout() {
  const { projects } = useLoaderData<{
    projects: Models.DocumentList<Models.Document>;
  }>();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <ProjectsContextProvider projects={projects}>
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
      </ProjectsContextProvider>
    </>
  );
}

export default AppLayout;
