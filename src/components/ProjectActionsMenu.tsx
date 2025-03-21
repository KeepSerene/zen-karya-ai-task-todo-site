// Type imports
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Project } from "@/types/types";

// Component imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AddProjectFormDialog from "./AddProjectFormDialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import ProjectDeleteButton from "./ProjectDeleteButton";

interface ProjectActionsMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

function ProjectActionsMenu({
  children,
  defaultFormData,
}: ProjectActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* Edit button */}
        <DropdownMenuItem asChild>
          <AddProjectFormDialog method="PUT" defaultFormData={defaultFormData}>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full px-2"
            >
              <Edit /> Edit
            </Button>
          </AddProjectFormDialog>
        </DropdownMenuItem>

        {/* Delete button */}
        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectActionsMenu;
