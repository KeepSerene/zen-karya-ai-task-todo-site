// Type import
import { SearchState } from "@/types/types";

// Library imports
import { Loader2, Search } from "lucide-react";

// Component import
import { Input } from "./ui/input";

// Util import
import { cn } from "@/lib/utils";

type SearchProjectsFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  searchState: SearchState;
};

function SearchProjectsField({
  handleChange,
  searchState,
}: SearchProjectsFieldProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />

      <Input
        type="text"
        name="project_input"
        onChange={handleChange}
        placeholder="Search projects..."
        autoFocus
        className="px-8"
      />

      <Loader2
        size={18}
        className={cn(
          "hidden text-muted-foreground absolute top-2 right-2 pointer-events-none",
          searchState !== "idle" && "block animate-spin"
        )}
      />
    </div>
  );
}

export default SearchProjectsField;
