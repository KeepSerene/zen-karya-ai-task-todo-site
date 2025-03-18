import { Skeleton } from "./ui/skeleton";

function TaskCardSkeleton() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="border-b pt-2 pb-3.5 grid grid-cols-[max-content,1fr] items-center gap-3"
    >
      <Skeleton
        aria-label="Loading task checkbox"
        className="size-5 rounded-full"
      />

      <Skeleton
        aria-label="Loading task content"
        className="w-auto h-3 mr-10"
      />
    </div>
  );
}

export default TaskCardSkeleton;
