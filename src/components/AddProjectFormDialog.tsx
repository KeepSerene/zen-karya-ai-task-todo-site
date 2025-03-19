// Type import
import { Project, ProjectFormData } from "@/types/types";

// React import
import { useState } from "react";

// Library import
import { useFetcher } from "react-router";

// Custom hook import
import { useToast } from "@/hooks/use-toast";

// Component imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddProjectForm from "./AddProjectForm";

// Util import
import { truncateText } from "@/lib/utils";

type AddProjectFormDialogProps = {
  children: React.ReactNode;
  method: "POST" | "PUT";
  defaultFormData?: Project;
};

function AddProjectFormDialog({
  children,
  method,
  defaultFormData,
}: AddProjectFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = useFetcher();

  const { toast } = useToast();

  const handleSubmit = (formData: ProjectFormData) => {
    // Set up a toast
    const { id, update } = toast({
      title: `${
        method === "POST" ? "Creating new" : "Updating your"
      } project...`,
      duration: Infinity,
    });

    fetcher.submit(JSON.stringify(formData), {
      method,
      encType: "application/json",
      action: "/app/projects",
    });

    // Update the toast after submission
    update({
      id,
      title: `${method === "POST" ? "Created a new" : "Updated your"} project!`,
      description: `Your project "${truncateText(formData.name, 32)}"${
        formData.ai_generated && " along with its AI-generated tasks"
      } has been successfully ${
        method === "POST" ? "created" : "updated"
      } and saved.`,
      duration: 5000,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger type="button" asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] border-0 !rounded-xl p-0">
        <DialogTitle className="sr-only">Add new project</DialogTitle>

        <DialogDescription className="sr-only">
          Use this form to add a new project to your list.
        </DialogDescription>

        <AddProjectForm
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onCancel={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddProjectFormDialog;
