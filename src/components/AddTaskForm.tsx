// Context import
import { useProjectsContext } from "@/contexts/ProjectsContextProvider";

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
  Check,
  ChevronDown,
  Hash,
  Inbox,
  Save,
  SendHorizonal,
  X,
} from "lucide-react";
import * as chrono from "chrono-node";

// Type imports
import type { Models } from "appwrite";
import type { ClassValue } from "clsx";
import type { TaskFormData } from "@/types/types";

// Util imports
import {
  cn,
  getFormattedDateLabel,
  getDueDateTextColor,
  truncateText,
} from "@/lib/utils";

type TaskFormProps = {
  mode: "create" | "edit";
  defaultFormData?: TaskFormData;
  onCancel?: () => void;
  onSubmit?: (formData: TaskFormData) => void;
  className?: ClassValue;
};

const DEFAULT_FORM_DATA: TaskFormData = {
  content: "",
  due_date: null,
  project: null, // It's the associated project ID
};

function AddTaskForm({
  mode,
  defaultFormData = DEFAULT_FORM_DATA,
  onCancel,
  onSubmit,
  className,
}: TaskFormProps) {
  const projects = useProjectsContext();

  const [formData, setFormData] = useState(defaultFormData);
  const [taskContent, setTaskContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [projectId, setProjectId] = useState(defaultFormData.project);
  const [projectName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState<string | undefined>(
    undefined
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);

  // Set form data
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      content: taskContent.trim(),
      due_date: dueDate,
      project: projectId,
    }));
  }, [taskContent, dueDate, projectId]);

  // Set due date from Chrono parsed task content
  useEffect(() => {
    const chronoParsingResult = chrono.parse(taskContent.trim());

    if (chronoParsingResult.length) {
      const latestDate = chronoParsingResult[chronoParsingResult.length - 1];
      setDueDate(latestDate?.date());
    }
  }, [taskContent]);

  // Set project name and project-color-hex given that a project ID exists
  useEffect(() => {
    if (projects && projectId) {
      const { name, color_hex } = projects.documents.find(
        ({ $id }) => $id === projectId
      ) as Models.Document;

      setProjectName(name);
      setProjectColorHex(color_hex);
    }
  }, [projects, projectId]);

  // Handle "add task" or "save changes"
  const handleSubmit = useCallback(() => {
    if (!taskContent.trim()) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent("");
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className={cn("focus-within:border-foreground/30", className)}>
      <CardContent className="p-2">
        <Textarea
          autoFocus
          value={taskContent}
          onChange={(event) => setTaskContent(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Complete your task and reward yourself with a well-deserved tour!"
          className="!border-0 p-1 mb-2 !ring-0"
        />

        <div className="max-w-max rounded-md ring-1 ring-border">
          {/* Due date popover (calendar) */}
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
                initialFocus
                disabled={{ before: new Date() }}
                selected={dueDate ? new Date(dueDate) : undefined}
                onSelect={(selectedDate) => {
                  setDueDate(selectedDate || null);
                  setIsCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          <>
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
          </>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-2 grid grid-cols-[minmax(0,1fr),max-content] gap-2">
        {/* Inbox or project selection combo box (dropdown menu) */}
        <Popover modal open={isComboBoxOpen} onOpenChange={setIsComboBoxOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              role="combobox"
              aria-expanded={isComboBoxOpen}
              className="max-w-max"
            >
              <>{projectId ? <Hash color={projectColorHex} /> : <Inbox />}</>

              <span>{truncateText(projectName, 15) || "Inbox"}</span>

              <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-[15rem] p-0">
            <Command>
              <CommandInput placeholder="Search tasks..." />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No projects found!</CommandEmpty>

                  <CommandGroup>
                    {projects &&
                      projects.documents.map(({ $id, name, color_hex }) => (
                        <CommandItem
                          key={$id}
                          onSelect={(selectedName) => {
                            setProjectName(
                              selectedName === projectName ? "" : name
                            );
                            setProjectId(
                              selectedName === projectName ? null : $id
                            );
                            setProjectColorHex(
                              selectedName === projectName
                                ? undefined
                                : color_hex
                            );
                            setIsComboBoxOpen(false);
                          }}
                          className="text-sm"
                        >
                          <Hash color={color_hex} />

                          <span>{name}</span>

                          <>
                            {name === projectName && (
                              <Check className="ml-auto" />
                            )}
                          </>
                        </CommandItem>
                      ))}
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
            aria-label={mode === "create" ? "Add task" : "Save changes"}
            className="capitalize disabled:cursor-not-allowed"
          >
            <span className="hidden md:inline">
              {mode === "create" ? "Add task" : "Save"}
            </span>
            <>
              {mode === "create" ? (
                <SendHorizonal className="md:hidden" />
              ) : (
                <Save className="md:hidden" />
              )}
            </>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AddTaskForm;
