// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Utility import
import { getClerkUserId } from "@/lib/utils";

// Type import
import type { LoaderFunction } from "react-router";

const fetchCompletedTasks = async () => {
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
        Query.equal("completed", true), // Get only completed tasks
        Query.orderDesc("$updatedAt"), // Order tasks according as their lastest update timestamp
      ]
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading tasks!";
    console.error("Failed to load tasks:", errMsg);

    throw new Error(`Failed to load tasks: ${errMsg}`);
  }
};

const completedTasksLoader: LoaderFunction = async () => {
  try {
    const tasks = await fetchCompletedTasks();

    // If "fetchCompletedTasks" returns a Response (meaning userId was not found), return it immediately
    if (tasks instanceof Response) {
      return tasks;
    }

    return { tasks };
  } catch (err) {
    console.error("Error loading completed tasks:", err);

    return new Response("Failed to load completed tasks!", { status: 500 });
  }
};

export default completedTasksLoader;
