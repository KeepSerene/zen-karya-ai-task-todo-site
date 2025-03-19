// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Utility import
import { getClerkUserId } from "@/lib/utils";

// Library import
import { startOfToday } from "date-fns";

// Type import
import type { LoaderFunction } from "react-router";

const fetchUpcomingTasks = async () => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    return userId;
  }

  try {
    return await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
      [
        Query.equal("userId", userId), // Get tasks for the current user
        Query.equal("completed", false), // Get only incomplete tasks
        Query.isNotNull("due_date"), // Get tasks with a due date
        Query.greaterThanEqual("due_date", startOfToday().toISOString()), // Get tasks scheduled starting today
        Query.orderAsc("due_date"), // Get tasks in the ascending order of their due date
      ]
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading tasks!";
    console.error("Failed to load tasks:", errMsg);

    throw new Error(`Failed to load tasks: ${errMsg}`);
  }
};

const upcomingTasksLoader: LoaderFunction = async () => {
  try {
    const tasks = await fetchUpcomingTasks();

    // If "fetchUpcomingTasks" returns a Response (meaning userId was not found), return it immediately
    if (tasks instanceof Response) {
      return tasks;
    }

    return { tasks };
  } catch (err) {
    console.error("Error loading upcoming tasks:", err);

    return new Response("Failed to load upcoming tasks!", {
      status: 500,
    });
  }
};

export default upcomingTasksLoader;
