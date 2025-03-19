// Library import
import { useLoaderData } from "react-router";

// Type import
import type { Models } from "appwrite";

// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import {
  PageContent,
  PageHeader,
  PageProvider,
  PageTitle,
} from "@/components/page";
import Topbar from "@/components/Topbar";
import EmptyState from "@/components/EmptyState";
import TaskCard from "@/components/TaskCard";

function CompletedTasksPage() {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <PageMetaTitle title="Completed Tasks | ZenKaryaX" />

      <Topbar tabName="Completed Tasks" taskCount={tasks.total} />

      <PageProvider>
        <PageHeader>
          <PageTitle>Completed tasks</PageTitle>
        </PageHeader>

        <PageContent>
          <>
            {tasks.documents.map(
              ({ $id, content, due_date, completed, project }) => (
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

          <>{tasks.total === 0 && <EmptyState type="completed" />}</>
        </PageContent>
      </PageProvider>
    </>
  );
}

export default CompletedTasksPage;
