// Type imports
import type { Project, ProjectFormData } from "@/types/types";

// React imports
import { useCallback, useEffect, useState } from "react";

// Component imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { Switch } from "./ui/switch";

// Library imports
import { Bot, Check, ChevronDown, Circle } from "lucide-react";

// Constant import
import { PROJECT_COLORS } from "@/constants/constants";
import { Textarea } from "./ui/textarea";

type AddProjectFormProps = {
  mode: "create" | "edit";
  defaultFormData?: Project;
  onCancel?: () => void;
  onSubmit?: (formData: ProjectFormData) => void;
};

const DEFAULT_PROJECT_NAME = "Untitled";
const DEFAULT_PROJECT_COLOR_NAME = "Slate";
const DEFAULT_PROJECT_COLOR_HEX = "#64748b";

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
};

function AddProjectForm({
  mode,
  defaultFormData = DEFAULT_FORM_DATA,
  onCancel = () => {},
  onSubmit,
}: AddProjectFormProps) {
  const [projectName, setProjectName] = useState(defaultFormData.name);
  const [projectNameCharCount, setProjectNameCharCount] = useState(
    defaultFormData.name.length
  );
  const [isColorSelectionMenuOpen, setIsColorSelectionMenuOpen] =
    useState(false);
  const [projectColorName, setProjectColorName] = useState(
    defaultFormData.color_name
  );
  const [projectColorHex, setProjectColorHex] = useState(
    defaultFormData.color_hex
  );
  const [shouldAIGenerateProject, setShouldAIGenerateProject] = useState(false);
  const [projectPrompt, setProjectPrompt] = useState("");
  const [formData, setFormData] = useState<ProjectFormData>({
    ...defaultFormData,
    ai_generated: shouldAIGenerateProject,
    generation_prompt: projectPrompt.trim(),
  });

  // Set form data
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      name: projectName.trim(),
      color_name: projectColorName,
      color_hex: projectColorHex,
      ai_generated: shouldAIGenerateProject,
      generation_prompt: projectPrompt.trim(),
    }));
  }, [
    projectName,
    projectColorName,
    projectColorHex,
    shouldAIGenerateProject,
    projectPrompt,
  ]);

  // Handle submission
  const handleSubmit = useCallback(() => {
    if (onSubmit) onSubmit(formData);
  }, [onSubmit, formData]);

  const handleEnterKeySubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        /*
         Submit only when:
         - Project name is not empty
         - AI generation is enabled, and prompt is not empty
         */
        if (
          projectName.trim() &&
          (!shouldAIGenerateProject ||
            (shouldAIGenerateProject && projectPrompt.trim()))
        ) {
          handleSubmit();
        }
      }
    },
    [projectName, shouldAIGenerateProject, projectPrompt, handleSubmit]
  );

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="capitalize">
          {mode === "create" ? "Add project" : "Edit project"}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 grid grid-cols-1 gap-2">
        <div>
          <Label htmlFor="project_name">Name</Label>

          <Input
            type="text"
            id="project_name"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.currentTarget.value);
              setProjectNameCharCount(event.currentTarget.value.length);
            }}
            onKeyDown={handleEnterKeySubmit}
            maxLength={120}
            className="mt-2 mb-1"
          />

          <p
            className={cn(
              "max-w-max text-muted-foreground text-xs ml-auto",
              projectNameCharCount >= 110 && "text-destructive"
            )}
          >
            {projectNameCharCount}/120
          </p>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>

          {/* Color selection menu (dropdown) */}
          <Popover
            modal
            open={isColorSelectionMenuOpen}
            onOpenChange={setIsColorSelectionMenuOpen}
          >
            {/* Menu trigger */}
            <PopoverTrigger type="button" asChild>
              <Button
                type="button"
                id="color"
                variant="outline"
                className="w-full mt-2"
              >
                <Circle fill={projectColorHex} />
                <span>{projectColorName}</span>
                <ChevronDown className="ml-auto" />
              </Button>
            </PopoverTrigger>

            {/* Menu content */}
            <PopoverContent
              align="start"
              className="w-[22.5rem] sm:w-[29.875rem] p-0"
            >
              {/* Menu inner */}
              <Command>
                <CommandInput placeholder="Search colors..." />

                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No colors found!</CommandEmpty>

                    <CommandGroup>
                      {PROJECT_COLORS.map(({ name, hex }) => (
                        <CommandItem
                          key={name}
                          value={`${name}:${hex}`}
                          onSelect={(value) => {
                            const [clrName, clrHex] = value.split(":");
                            setProjectColorName(clrName);
                            setProjectColorHex(clrHex);
                            setIsColorSelectionMenuOpen(false);
                          }}
                        >
                          <Circle fill={hex} />

                          <span>{name}</span>

                          <>
                            {projectColorName === name && (
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
        </div>

        <>
          {mode === "create" && (
            <div className="border rounded-md mt-6">
              <div className="px-3 py-2 flex items-center gap-3">
                <Bot className="text-muted-foreground flex-shrink-0" />

                <div className="space-y-0.5 mr-auto">
                  <Label
                    htmlFor="ai_project_generator_control"
                    className="text-sm capitalize"
                  >
                    ZenKaryaX AI assist
                  </Label>

                  <p className="text-muted-foreground text-xs">
                    Let ZenKaryaX AI craft your project plan&ndash;just share a
                    quick prompt.
                  </p>
                </div>

                <Switch
                  id="ai_project_generator_control"
                  onCheckedChange={setShouldAIGenerateProject}
                />
              </div>

              <>
                {shouldAIGenerateProject && (
                  <Textarea
                    autoFocus
                    value={projectPrompt}
                    onChange={(event) =>
                      setProjectPrompt(event.currentTarget.value)
                    }
                    onKeyDown={handleEnterKeySubmit}
                    placeholder="Describe your project idea, goals, or vision, and let ZenKaryaX AI handle the rest!"
                    className="border-none placeholder:text-sm"
                  />
                )}
              </>
            </div>
          )}
        </>
      </CardContent>

      <Separator />

      <CardFooter className="p-4 flex justify-end items-center gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancal
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={
            !projectName.trim() ||
            (shouldAIGenerateProject && !projectPrompt.trim())
          }
        >
          {mode === "create" ? "Add" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddProjectForm;
