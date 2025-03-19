// Type import
import type { Models } from "appwrite";

// Library imports
import { Hash, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

// Component import
import ProjectActionsMenu from "./ProjectActionsMenu";
import { Button } from "./ui/button";

function ProjectCard({ project }: { project: Models.Document }) {
  return (
    <li className="group/card h-14 rounded-lg px-2 flex items-center gap-3 relative transition-colors hover:bg-secondary focus-within:bg-secondary">
      <Hash size={16} color={project.color_hex} className="shrink-0" />

      <p className="max-w-[48ch] text-sm truncate">{project.name}</p>

      {/* More actions menu */}
      <ProjectActionsMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_name: project.color_name,
          color_hex: project.color_hex,
        }}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Click to find more options"
          title="More options"
          className="shrink-0 ml-auto md:opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-within/card:opacity-100 relative z-20"
        >
          <MoreHorizontal />
        </Button>
      </ProjectActionsMenu>

      <Link
        to={`/app/projects/${project.$id}`}
        className="absolute inset-0 z-10"
      />
    </li>
  );
}

export default ProjectCard;
