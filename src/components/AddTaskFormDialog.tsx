// React import
import { useState } from "react";

// Component imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddTaskForm from "./AddTaskForm";

// Library imports
import { useFetcher, useLocation } from "react-router";
import { startOfToday } from "date-fns";

function AddTaskFormDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const fetcher = useFetcher();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] border-0 rounded-xl p-0">
        <DialogTitle className="sr-only">Add new task</DialogTitle>

        <DialogDescription className="sr-only">
          Use this form to add a new task to your list.
        </DialogDescription>

        <AddTaskForm
          mode="create"
          defaultFormData={{
            content: "",
            due_date:
              location.pathname === "/app/today" ? startOfToday() : null,
            projectId: null,
          }}
          onCancel={() => setIsOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              method: "POST",
              action: "/app",
              encType: "application/json",
            });
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskFormDialog;
