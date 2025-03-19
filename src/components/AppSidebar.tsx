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
import { UserButton } from "@clerk/clerk-react";

// Library imports
import { Link, useLocation } from "react-router";
import { ChevronRight, CirclePlus, Plus } from "lucide-react";

// Constant import
import { SIDEBAR_MENU_ITEMS } from "@/constants/constants";

function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();

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
                {SIDEBAR_MENU_ITEMS.map((item, index) => (
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

                    <SidebarMenuBadge>0</SidebarMenuBadge>
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

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className="text-muted-foreground text-sm p-2">
                      Click + to add a new project
                    </p>
                  </SidebarMenuItem>
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
