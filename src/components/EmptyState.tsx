// Asset imports
import {
  inboxTaskEmptyState,
  todayTaskEmptyState,
  upcomingTaskEmptyState,
  completedTaskEmptyState,
  projectTaskEmptyState,
} from "@/assets/assets";

type EmptyStateType = "inbox" | "today" | "upcoming" | "completed" | "project";

interface EmptyStateProps {
  type?: EmptyStateType;
}

interface EmptyStateObject {
  img?: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
}

const emptyStates: Record<EmptyStateType, EmptyStateObject> = {
  inbox: {
    img: {
      src: inboxTaskEmptyState,
      width: 344,
      height: 260,
    },
    title: "What's Stirring in Your Mind?",
    description:
      "Let ZenKaryaX capture those spontaneous ideas and tasks. Tap + to bring your thoughts to life.",
  },

  today: {
    img: {
      src: todayTaskEmptyState,
      width: 226,
      height: 260,
    },
    title: "Make Today Extraordinary",
    description:
      "Focus on what truly matters today. Start your day with ZenKaryaX—click + to set your priorities.",
  },

  upcoming: {
    img: {
      src: upcomingTaskEmptyState,
      width: 208,
      height: 260,
    },
    title: "Envision Your Future",
    description:
      "Plan ahead with AI-powered foresight. Tap + to schedule tasks that shape a brilliant tomorrow.",
  },

  completed: {
    img: {
      src: completedTaskEmptyState,
      width: 231,
      height: 260,
    },
    title: "Celebrate Your Achievements",
    description:
      "Every completed task is a milestone. Reflect on your wins and get inspired to do even more.",
  },

  project: {
    img: {
      src: projectTaskEmptyState,
      width: 228,
      height: 260,
    },
    title: "Create Your Next Masterpiece",
    description:
      "Organize your project tasks with ZenKaryaX’s intelligent planning. Click + to kickstart your creative journey.",
  },
};

function EmptyState({ type = "today" }: EmptyStateProps) {
  const { img, title, description } = emptyStates[type];

  return (
    <div className="max-w-[22.5rem] text-center mx-auto flex flex-col items-center">
      {img && (
        <figure>
          <img src={img.src} width={img.width} height={img.height} alt="" />

          <figcaption className="sr-only">
            A visual representation of an emtpy state
          </figcaption>
        </figure>
      )}

      <h3 className="capitalize mt-4 mb-2">{title}</h3>

      <p className="text-muted-foreground text-sm px-4">{description}</p>
    </div>
  );
}

export default EmptyState;
