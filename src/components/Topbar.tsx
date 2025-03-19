// React imports
import { useEffect, useState } from "react";

// Component imports
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { SidebarTrigger } from "./ui/sidebar";
import HotKeysGuide from "./HotkeysGuide";

// Util import
import { cn } from "@/lib/utils";

type TopbarProps = {
  tabName: string;
  taskCount?: number;
};

function Topbar({ tabName, taskCount }: TopbarProps) {
  const [shouldShowTabName, setShouldShowTabName] = useState(false);

  // Show "tabName" on scroll
  useEffect(() => {
    const handler = () => {
      setShouldShowTabName(window.scrollY > 70);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full h-14 bg-background px-4 grid grid-cols-[40px,minmax(0,1fr),40px] items-center sticky top-0 z-40",
        shouldShowTabName && "border-b"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger type="button" />
        </TooltipTrigger>

        <TooltipContent className="flex items-center">
          <p>Toggle sidebar</p>

          <HotKeysGuide hotKeyList={["Ctrl", "B"]} />
        </TooltipContent>
      </Tooltip>

      <section
        className={cn(
          "max-w-[30rem] text-center mx-auto transition-[transform,opacity]",
          shouldShowTabName
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        )}
      >
        <h2 className="font-semibold capitalize truncate">{tabName}</h2>

        {Boolean(taskCount) && (
          <p className="text-muted-foreground text-xs">{taskCount} tasks</p>
        )}
      </section>
    </div>
  );
}

export default Topbar;
