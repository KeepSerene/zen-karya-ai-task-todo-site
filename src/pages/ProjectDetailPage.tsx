// Library imports
import { useFetcher, useLoaderData } from "react-router";

// Type import
import type { Models } from "appwrite";

// React import
import { useState } from "react";

// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import Topbar from "@/components/Topbar";
import {
  PageContent,
  PageHeader,
  PageProvider,
  PageTitle,
} from "@/components/page";
import { Button } from "@/components/ui/button";
import ProjectActionsMenu from "@/components/ProjectActionsMenu";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";
import AddTaskForm from "@/components/AddTaskForm";
import AddTaskButton from "@/components/AddTaskButton";
import EmptyState from "@/components/EmptyState";

// Library import
import { MoreHorizontal } from "lucide-react";

function ProjectDetailPage() {
  const { project } = useLoaderData<{ project: Models.Document }>();

  const fetcher = useFetcher();

  // Retrieve incomplete tasks from the project
  const incompleteTasks: Models.Document[] = project.tasks.filter(
    (task: Models.Document) => !task.completed
  );

  // Sort incomplete tasks by their due date
  const sortedIncompleteTasks = incompleteTasks.sort((t1, t2) => {
    return t1.due_date > t2.due_date ? 1 : -1;
  });

  const [shouldShowAddTaskForm, setShouldShowAddTaskForm] = useState(false);

  return (
    <>
      <PageMetaTitle title={`${project.name} | ZenKaryaX`} />

      <Topbar tabName={project.name} />

      <PageProvider>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>{project.name}</PageTitle>

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
                className="shrink-0 size-8"
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionsMenu>
          </div>
        </PageHeader>

        <PageContent>
          <>
            {sortedIncompleteTasks.map(
              ({ $id, content, completed, due_date }) => (
                <TaskCard
                  key={$id}
                  id={$id}
                  content={content}
                  dueDate={due_date}
                  completed={completed}
                  project={project}
                />
              )
            )}
          </>

          <>{fetcher.state !== "idle" && <TaskCardSkeleton />}</>

          <>
            {shouldShowAddTaskForm ? (
              <AddTaskForm
                mode="create"
                defaultFormData={{
                  content: "",
                  due_date: null,
                  project: project.$id,
                }}
                onCancel={() => setShouldShowAddTaskForm(false)}
                onSubmit={(formData) => {
                  fetcher.submit(JSON.stringify(formData), {
                    method: "POST",
                    encType: "application/json",
                    action: "/app",
                  });
                }}
                className="mt-1"
              />
            ) : (
              <>
                <AddTaskButton onClick={() => setShouldShowAddTaskForm(true)} />

                {sortedIncompleteTasks.length === 0 && (
                  <EmptyState type="project" />
                )}
              </>
            )}
          </>
        </PageContent>
      </PageProvider>
    </>
  );
}

export default ProjectDetailPage;
