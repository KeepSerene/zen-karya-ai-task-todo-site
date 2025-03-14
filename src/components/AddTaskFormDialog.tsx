// Component imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddTaskForm from "./AddTaskForm";

function AddTaskFormDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="border-0 rounded-xl p-0">
        <DialogTitle className="sr-only">Add new task</DialogTitle>

        <DialogDescription className="sr-only">
          Use this form to add a new task to your list.
        </DialogDescription>

        <AddTaskForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskFormDialog;
