// Library imports
import { useLoaderData } from "react-router";
import { Plus } from "lucide-react";

// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import Topbar from "@/components/Topbar";
import {
  PageContent,
  PageHeader,
  PageProvider,
  PageTitle,
} from "@/components/page";
import AddProjectFormDialog from "@/components/AddProjectFormDialog";
import { Button } from "@/components/ui/button";
import { Models } from "appwrite";
import ProjectCard from "@/components/ProjectCard";

function ProjectsPage() {
  const { projects } = useLoaderData<{
    projects: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <PageMetaTitle title="My Projects | ZenKaryaX" />

      <Topbar tabName="My projects" />

      <PageProvider>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My projects</PageTitle>

            <AddProjectFormDialog method="POST">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Create a new project"
                title="Create a new project"
                className="size-8"
              >
                <Plus />
              </Button>
            </AddProjectFormDialog>
          </div>
        </PageHeader>

        <PageContent>
          <div className="h-8 border-b flex items-center">
            <p className="text-sm">{projects.total} projects</p>
          </div>

          <ul className="">
            {projects.documents.map((project) => (
              <ProjectCard key={project.$id} project={project} />
            ))}
          </ul>
        </PageContent>
      </PageProvider>
    </>
  );
}

export default ProjectsPage;
