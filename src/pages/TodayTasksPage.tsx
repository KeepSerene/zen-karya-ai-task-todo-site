// Library imports
import { useFetcher, useLoaderData } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { startOfToday } from "date-fns";

// Type import
import type { Models } from "appwrite";

// React import
import { useState } from "react";

// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import {
  PageContent,
  PageHeader,
  PageProvider,
  PageTitle,
} from "@/components/page";
import Topbar from "@/components/Topbar";
import AddTaskButton from "@/components/AddTaskButton";
import EmptyState from "@/components/EmptyState";
import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";

function TodayTasksPage() {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  const [shouldShowAddTaskForm, setShouldShowAddTaskForm] = useState(false);

  const fetcher = useFetcher();

  return (
    <>
      <PageMetaTitle title="Today's Task Overview | ZenKaryaX" />

      <Topbar tabName="Today's Task Overview" taskCount={tasks.total} />

      <PageProvider>
        <PageHeader>
          <PageTitle>Today's task overview</PageTitle>

          <>
            {tasks.total > 0 && (
              <div className="text-muted-foreground text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} />

                <span>
                  {tasks.total > 1 ? `${tasks.total} tasks` : "1 task"}
                </span>
              </div>
            )}
          </>
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

          <>{fetcher.state !== "idle" && <TaskCardSkeleton />}</>

          <>
            {shouldShowAddTaskForm ? (
              <AddTaskForm
                mode="create"
                defaultFormData={{
                  content: "",
                  due_date: startOfToday(),
                  project: null,
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

                {tasks.total === 0 && <EmptyState type="today" />}
              </>
            )}
          </>
        </PageContent>
      </PageProvider>
    </>
  );
}

export default TodayTasksPage;
