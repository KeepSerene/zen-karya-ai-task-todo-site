// Component import
import { Button } from "./ui/button";

// Library import
import { CirclePlus } from "lucide-react";

type AddTaskButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

function AddTaskButton(props: AddTaskButtonProps) {
  return (
    <Button
      type="button"
      variant="link"
      className="justify-start w-full capitalize px-0 mb-4"
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
}

export default AddTaskButton;
