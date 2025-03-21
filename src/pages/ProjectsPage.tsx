// Library imports
import { useFetcher, useLoaderData } from "react-router";
import { Plus } from "lucide-react";

// React imports
import { useCallback, useRef, useState } from "react";

// Type imports
import type { Models } from "appwrite";
import type { SearchState } from "@/types/types";

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
import ProjectCard from "@/components/ProjectCard";
import SearchProjectsField from "@/components/SearchProjectsField";

// Util import
import { cn } from "@/lib/utils";

interface LoaderAndFetcherData {
  projects: Models.DocumentList<Models.Document>;
}

function ProjectsPage() {
  const loaderData = useLoaderData<LoaderAndFetcherData>();

  const fetcher = useFetcher();

  const fetcherData = fetcher.data as LoaderAndFetcherData;

  const { projects } = fetcherData || loaderData; // The order is important

  const [searchState, setSearchState] = useState<SearchState>("idle");

  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeoutId.current) clearTimeout(searchTimeoutId.current);

      const formEl = event.currentTarget.form;

      // Trigger search after a 500ms delay
      searchTimeoutId.current = setTimeout(async () => {
        // Searching for projects
        setSearchState("searching");

        try {
          await fetcher.submit(formEl);
        } catch (err) {
          console.error("Failed to process the search request:", err);
        }

        setSearchState("idle");
      }, 500);

      // Loading all relevant projects
      setSearchState("loading");
    },
    []
  );

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

          {/* Search projects form */}
          <fetcher.Form method="GET" action="/app/projects">
            <SearchProjectsField
              searchState={searchState}
              handleChange={handleSearch}
            />
          </fetcher.Form>
        </PageHeader>

        <PageContent>
          <div className="h-8 border-b flex items-center">
            <p className="text-sm">
              {projects.total > 1
                ? `${projects.total} projects`
                : `${projects.total} project`}
            </p>
          </div>

          {/* Project cards */}
          <ul className={cn(searchState === "searching" && "opacity-25")}>
            <>
              {projects.documents.map((project) => (
                <ProjectCard key={project.$id} project={project} />
              ))}
            </>

            <>
              {projects.total === 0 && (
                <li className="h-14 text-muted-foreground flex justify-center items-center">
                  No projects found!
                </li>
              )}
            </>
          </ul>
        </PageContent>
      </PageProvider>
    </>
  );
}

export default ProjectsPage;
