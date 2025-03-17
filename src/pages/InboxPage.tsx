// Library imports
import { useFetcher, useLoaderData } from "react-router";

// Type imports
import type { Models } from "appwrite";
import type { Task } from "@/types/types";

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

function InboxPage() {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document & Task>;
  }>();

  const [shouldShowAddTaskForm, setShouldShowAddTaskForm] = useState(false);

  const fetcher = useFetcher();

  return (
    <>
      <PageMetaTitle title="Inbox | ZenKaryaX" />

      <Topbar tabName="Inbox" taskCount={20} />

      <PageProvider>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageContent>
          {tasks.documents.map(
            ({ $id, content, due_date, completed, projectId }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                dueDate={due_date}
                completed={completed}
                project={projectId}
              />
            )
          )}

          {shouldShowAddTaskForm ? (
            <AddTaskForm
              mode="create"
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

              <EmptyState type="upcoming" />
            </>
          )}
        </PageContent>
      </PageProvider>
    </>
  );
}

export default InboxPage;
