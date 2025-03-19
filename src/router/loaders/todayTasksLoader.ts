// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Utility import
import { getClerkUserId } from "@/lib/utils";

// Library imports
import { startOfToday, startOfTomorrow } from "date-fns";

// Type import
import type { LoaderFunction } from "react-router";

const fetchTodayTasks = async () => {
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
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()),
          Query.lessThan("due_date", startOfTomorrow().toISOString()),
        ]), // Get tasks due today
      ]
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading tasks!";
    console.error("Failed to load tasks:", errMsg);

    throw new Error(`Failed to load tasks: ${errMsg}`);
  }
};

const todayTasksLoader: LoaderFunction = async () => {
  try {
    const tasks = await fetchTodayTasks();

    // If "fetchTodayTasks" returns a Response (meaning userId was not found), return it immediately
    if (tasks instanceof Response) {
      return tasks;
    }

    return { tasks };
  } catch (err) {
    console.error("Error loading tasks scheduled for today:", err);

    return new Response("Failed to load tasks scheduled for today!", {
      status: 500,
    });
  }
};

export default todayTasksLoader;
