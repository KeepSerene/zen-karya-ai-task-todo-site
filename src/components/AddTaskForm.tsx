// React imports
import { useCallback, useEffect, useState } from "react";

// Component imports
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";

// Library imports
import {
  CalendarIcon,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from "lucide-react";

// Type imports
import type { ClassValue } from "clsx";
import type { TaskForm } from "@/types/types";

// Util import
import { cn, getFormattedDateLabel, getDueDateTextColor } from "@/lib/utils";

type TaskFormProps = {
  defaultFormData?: TaskForm;
  mode: "create" | "edit";
  onCancel: () => void;
  onSubmit?: (formData: TaskForm) => void;
  className?: ClassValue;
};

const DEFAULT_FORM_DATA: TaskForm = {
  content: "",
  due_date: null,
  taskId: null,
};

function AddTaskForm({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel,
  onSubmit,
  className,
}: TaskFormProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [taskContent, setTaskContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [taskId, setTaskId] = useState(defaultFormData.taskId);

  const [projectName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState("");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);

  // Set form data
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      content: taskContent.trim(),
      due_date: dueDate,
      taskId: taskId,
    }));
  }, [taskContent, dueDate, taskId]);

  const handleSubmit = useCallback(() => {
    if (!taskContent.trim()) return;

    console.log(formData);

    if (onSubmit) onSubmit(formData);

    setTaskContent("");
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className="focus-within:border-foreground/30">
      <CardContent className="p-2">
        <Textarea
          autoFocus
          value={taskContent}
          onChange={(event) => setTaskContent(event.currentTarget.value)}
          placeholder="Complete your task and reward yourself with a well-deserved tour!"
          className="!border-0 p-1 mb-2 !ring-0"
        />

        <div className="max-w-max rounded-md ring-1 ring-border">
          {/* Due date popover */}
          <Popover modal open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`${cn(
                  getDueDateTextColor(dueDate, false)
                )} capitalize`}
              >
                <CalendarIcon />{" "}
                {dueDate ? getFormattedDateLabel(dueDate) : "Due date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                initialFocus
                onSelect={(selectedDate) => {
                  setDueDate(selectedDate || null);
                  setIsCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDueDate(null)}
                  aria-label="Remove due date"
                  className="px-2 -ml-2"
                >
                  <X />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-2 grid grid-cols-[minmax(0,1fr),max-content] gap-2">
        {/* Task selection popover */}
        <Popover modal open={isComboBoxOpen} onOpenChange={setIsComboBoxOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              role="combobox"
              aria-expanded="false"
              className="max-w-max"
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-[15rem] p-0">
            <Command>
              <CommandInput placeholder="Search tasks..." />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No tasks found!</CommandEmpty>

                  <CommandGroup>
                    <CommandItem>
                      <Hash /> Task 1
                    </CommandItem>

                    <CommandItem>
                      <Hash /> Task 2
                    </CommandItem>

                    <CommandItem>
                      <Hash /> Task 3
                    </CommandItem>

                    <CommandItem>
                      <Hash /> Task 4
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            aria-label="Cancel"
          >
            <span className="hidden md:inline">Cancel</span>
            <X className="md:hidden" />
          </Button>

          <Button
            type="button"
            disabled={!taskContent.trim()}
            onClick={handleSubmit}
            aria-label="Add task"
            className="capitalize disabled:cursor-not-allowed"
          >
            <span className="hidden md:inline">
              {mode === "create" ? "Add task" : "Save"}
            </span>
            <SendHorizonal className="md:hidden" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AddTaskForm;
