// Type import
import { Project } from "@/types/types";

// React import
import { useCallback } from "react";

// Component imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

// Library imports
import { useFetcher } from "react-router";
import { Trash2 } from "lucide-react";

// Util import
import { truncateText } from "@/lib/utils";

function ProjectDeleteButton({
  defaultFormData,
}: {
  defaultFormData: Project;
}) {
  const fetcher = useFetcher();

  const handleDelete = useCallback(async () => {
    try {
      fetcher.submit(defaultFormData, {
        method: "DELETE",
        encType: "application/json",
        action: "/app/projects",
      });
    } catch (err) {
      console.error("Failed to process delete request:", err);
    }
  }, [defaultFormData]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start w-full !text-destructive px-2"
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Delete project
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          Are you sure you want to delete the project:{" "}
          <strong>"{truncateText(defaultFormData.name, 49)}"</strong>? This
          action <strong>cannot</strong> be undone, and all associated data will
          be permanently removed.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

          <AlertDialogAction type="button" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ProjectDeleteButton;
