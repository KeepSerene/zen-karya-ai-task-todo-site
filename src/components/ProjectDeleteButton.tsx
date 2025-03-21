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
import { useFetcher, useLocation, useNavigate } from "react-router";
import { Trash2 } from "lucide-react";

// Custom hook import
import { useToast } from "@/hooks/use-toast";

// Util import
import { truncateText } from "@/lib/utils";

function ProjectDeleteButton({
  defaultFormData,
}: {
  defaultFormData: Project;
}) {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = useCallback(async () => {
    // Navigate to the inbox page when deleting a project from the project detail page
    if (location.pathname === `/app/projects/${defaultFormData.id}`) {
      navigate("/app/inbox");
    }

    const { id, update } = toast({
      title: "Deleting project...",
      duration: Infinity,
    });

    try {
      fetcher.submit(defaultFormData, {
        method: "DELETE",
        encType: "application/json",
        action: "/app/projects",
      });

      update({
        id,
        title: "Project deleted!",
        description: `Your project "${truncateText(
          defaultFormData.name,
          32
        )}" has been successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.error("Failed to process the delete request:", err);

      update({
        id,
        title: "Failed to delete your project!",
        description: `An error occurred while deleting your project "${truncateText(
          defaultFormData.name,
          32
        )}". Try again later.`,
        duration: 5000,
      });
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
