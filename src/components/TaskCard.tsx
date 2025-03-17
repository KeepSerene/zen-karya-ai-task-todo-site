// React import
import { useCallback, useState } from "react";

// Type imports
import type { Models } from "appwrite";
import type { Project, Task } from "@/types/types";

// Component imports
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AddTaskForm from "./AddTaskForm";

// Utility imports
import { cn, getDueDateTextColor, getFormattedDateLabel } from "@/lib/utils";

// Library imports
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from "lucide-react";
import { useFetcher } from "react-router";

type TaskCardProps = {
  id: string;
  content: string;
  dueDate: Date | null;
  completed: boolean | undefined;
  project: (Models.Document & Project) | null;
};

function TaskCard({ id, content, dueDate, completed, project }: TaskCardProps) {
  const [shouldShowAddTaskForm, setShouldShowAddTaskForm] = useState(false);

  const fetcher = useFetcher();

  /*
    Capture the server response after mutations (edits/updates)
    Initially undefined, it will contain data only after a fetcher action completes
    This gives us the "server truth" after an update, before the UI naturally refreshes
  */
  const updatedServerTask = fetcher.json as Task;

  // Get up-to-date task fields
  const task: Task = Object.assign(
    {
      id,
      content,
      due_date: dueDate,
      completed,
      project,
    },
    updatedServerTask
  );

  const handleTaskCompletion = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        method: "PUT",
        encType: "application/json",
        action: "/app",
      });
    },
    [task.id, task.completed]
  );

  return (
    <>
      {shouldShowAddTaskForm ? (
        <AddTaskForm
          mode="edit"
          defaultFormData={{
            ...task,
            project: project && project.$id,
          }}
          onCancel={() => setShouldShowAddTaskForm(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              method: "PUT",
              encType: "application/json",
              action: "/app",
            });

            setShouldShowAddTaskForm(false);
          }}
          className="my-1"
        />
      ) : (
        <div className="group/card border-b grid grid-cols-[max-content,minmax(0,1fr)] gap-3 relative">
          {/* Check button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={async () => {
              await handleTaskCompletion(!task.completed);
            }}
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Mark task as ${
              task.completed ? "incomplete" : "complete"
            }`}
            aria-describedby="task-content"
            title={`Mark task as ${task.completed ? "incomplete" : "complete"}`}
            className={cn(
              "size-5 rounded-full mt-2 group/button",
              task.completed && "bg-border"
            )}
          >
            <Check
              strokeWidth={4}
              className={cn(
                "!size-3 text-muted-foreground transition-opacity group-hover/button:opacity-100 group-focus-visible/button:opacity-100",
                task.completed ? "opacity-100" : "opacity-0"
              )}
            />
          </Button>

          <Card className="border-none rounded-none py-2 space-y-1.5">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  "text-sm mr-16 md:mr-0",
                  task.completed && "text-muted-foreground line-through"
                )}
              >
                {task.content}
              </p>
            </CardContent>

            <CardFooter className="p-0 flex gap-4">
              <>
                {task.due_date && (
                  <div
                    className={cn(
                      "text-muted-foreground text-xs flex items-center gap-1",
                      getDueDateTextColor(task.due_date, task.completed)
                    )}
                  >
                    <CalendarDays size={14} />

                    {getFormattedDateLabel(task.due_date)}
                  </div>
                )}
              </>

              <div className="text-muted-foreground text-xs ml-auto grid grid-cols-[minmax(0,11.25rem),max-content] items-center gap-1">
                <div className="justify-self-end truncate">
                  {task.project?.name || "Inbox"}
                </div>

                <>
                  {task.project ? (
                    <Hash size={14} />
                  ) : (
                    <Inbox size={14} className="text-muted-foreground" />
                  )}
                </>
              </div>
            </CardFooter>
          </Card>

          {/* Action buttons */}
          <div className="bg-background pl-1 shadow-[-10px_0_5px_0_hsl(var(--background))] flex items-center gap-1 absolute top-1.5 right-0 md:opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-within/card:opacity-100">
            {!task.completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShouldShowAddTaskForm(true)}
                    aria-label="Edit task"
                    className="size-6 text-muted-foreground"
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Delete task"
                  className="size-6 text-muted-foreground"
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
