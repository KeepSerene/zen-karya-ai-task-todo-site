// Type imports
import type { Models } from "appwrite";
import type { TaskCount } from "@/types/types";

// Component imports
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import Logo from "./Logo";
import AddTaskFormDialog from "./AddTaskFormDialog";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AddProjectFormDialog from "./AddProjectFormDialog";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import ProjectActionsMenu from "./ProjectActionsMenu";
import { UserButton } from "@clerk/clerk-react";

// Library imports
import { Link, useLoaderData, useLocation } from "react-router";
import {
  ChevronRight,
  CirclePlus,
  Hash,
  MoreHorizontal,
  Plus,
} from "lucide-react";

// Context import
import { useProjectsContext } from "@/contexts/ProjectsContextProvider";

// Constant import
import { SIDEBAR_NAV_ITEMS } from "@/constants/constants";

type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  taskCount: TaskCount;
};

function AppSidebar() {
  const { taskCount } = useLoaderData<AppLoaderData>();
  const projects = useProjectsContext();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/app/inbox" className="w-max">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Group 1: add task button & nav menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Add task button */}
              <SidebarMenuItem>
                <AddTaskFormDialog>
                  <SidebarMenuButton
                    type="button"
                    className="!text-primary capitalize"
                  >
                    <CirclePlus /> Add task
                  </SidebarMenuButton>
                </AddTaskFormDialog>
              </SidebarMenuItem>

              {/* Sidebar nav menu */}
              <>
                {SIDEBAR_NAV_ITEMS.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      type="button"
                      asChild
                      onClick={() => {
                        if (isMobile) setOpenMobile(false);
                      }}
                      isActive={location.pathname === item.href}
                    >
                      <Link to={item.href}>
                        {/* Lucide react icon */}
                        <item.icon />

                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* Inbox task count badge */}
                    <>
                      {item.href === "/app/inbox" &&
                        Boolean(taskCount.inbox) && (
                          <SidebarMenuBadge>{taskCount.inbox}</SidebarMenuBadge>
                        )}
                    </>

                    {/* Today task count badge */}
                    <>
                      {item.href === "/app/today" &&
                        Boolean(taskCount.today) && (
                          <SidebarMenuBadge>{taskCount.today}</SidebarMenuBadge>
                        )}
                    </>
                  </SidebarMenuItem>
                ))}
              </>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 2: all projects */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-within:bg-sidebar-accent focus-within:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger type="button">
                <ChevronRight className="mr-1 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* Add project button */}
            <Tooltip>
              <AddProjectFormDialog method="POST">
                <TooltipTrigger asChild>
                  <SidebarGroupAction type="button" aria-label="Add project">
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </AddProjectFormDialog>

              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            {/* Projects */}
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <>
                    {projects && projects.total > 0 ? (
                      projects.documents
                        .slice(0, 5)
                        .map(({ $id, name, color_name, color_hex }) => (
                          <SidebarMenuItem key={$id}>
                            <SidebarMenuButton
                              type="button"
                              onClick={() => {
                                if (isMobile) {
                                  setOpenMobile(false);
                                }
                              }}
                              isActive={
                                location.pathname === `/app/projects/${$id}`
                              }
                              asChild
                            >
                              <Link to={`/app/projects/${$id}`}>
                                <Hash color={color_hex} />

                                <span className="truncate">{name}</span>
                              </Link>
                            </SidebarMenuButton>

                            <ProjectActionsMenu
                              defaultFormData={{
                                id: $id,
                                name,
                                color_name,
                                color_hex,
                              }}
                              side="right"
                              align="start"
                            >
                              <SidebarMenuAction
                                type="button"
                                showOnHover
                                aria-label="Click to find more options"
                                title="More options"
                                className="bg-sidebar-accent"
                              >
                                <MoreHorizontal />
                              </SidebarMenuAction>
                            </ProjectActionsMenu>
                          </SidebarMenuItem>
                        ))
                    ) : (
                      <SidebarMenuItem>
                        <p className="text-muted-foreground text-sm p-2">
                          Click + to add a new project
                        </p>
                      </SidebarMenuItem>
                    )}
                  </>

                  <>
                    {projects && projects.total > 5 && (
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          type="button"
                          onClick={() => {
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                          isActive={location.pathname === "/app/projects"}
                          asChild
                          className="text-muted-foreground"
                        >
                          <Link to="/app/projects">
                            <MoreHorizontal />
                            <span>View all projects</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "justify-start w-full rounded-md p-2 !shadow-none hover:bg-sidebar-accent focus-visible:bg-sidebar-accent",
              userButtonBox: "flex-row-reverse gap-2 shadow-none",
              userButtonOuterIdentifier: "pl-0",
              popoverBox: "pointer-events-auto",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
