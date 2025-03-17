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
} from "./ui/sidebar";
import Logo from "./Logo";
import AddTaskFormDialog from "./AddTaskFormDialog";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { UserButton } from "@clerk/clerk-react";

// Library imports
import { Link } from "react-router";
import { ChevronRight, CirclePlus, Plus } from "lucide-react";

// Constant import
import { SIDEBAR_LINKS } from "@/constants/constants";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/app/inbox" className="w-max">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Group 1: add task button & menu */}
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

              {/* Sidebar links */}
              {SIDEBAR_LINKS.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={link.href}>
                      {/* Lucide react icon */}
                      <link.icon />

                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
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
              <TooltipTrigger asChild>
                <SidebarGroupAction type="button" aria-label="Add project">
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>

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
