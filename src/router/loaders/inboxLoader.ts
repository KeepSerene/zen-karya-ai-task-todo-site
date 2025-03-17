// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Utility import
import { getClerkUserId } from "@/lib/utils";

// Type import
import type { LoaderFunction } from "react-router";

const fetchInboxTasks = async () => {
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
        Query.isNull("project"), // Get tasks that are not associated with a project
      ]
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading tasks!";
    console.error("Failed to load tasks:", errMsg);

    throw new Error(`Failed to load tasks: ${errMsg}`);
  }
};

const inboxLoader: LoaderFunction = async () => {
  try {
    const tasks = await fetchInboxTasks();

    // If "fetchInboxTasks" returns a Response (meaning userId was not found), return it immediately
    if (tasks instanceof Response) {
      return tasks;
    }

    return { tasks };
  } catch (err) {
    console.error("Error loading inbox tasks:", err);

    return new Response("Failed to load inbox tasks!", { status: 500 });
  }
};

export default inboxLoader;
