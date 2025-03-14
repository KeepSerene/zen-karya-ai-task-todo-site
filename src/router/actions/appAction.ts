// Appwrite imports
import { databases, ID } from "@/lib/appwrite";

// Util import
import { getUserIdFromLocalStorage } from "@/lib/utils";

// Type imports
import type { ActionFunction } from "react-router";
import type { Task } from "@/types/types";

const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
      ID.unique(),
      { ...data, userId: getUserIdFromLocalStorage() }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error: Failed to create the desired task:", err.message);
    } else {
      console.error(
        "An unknown error occurred while creating the desired task:",
        err
      );
    }
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const formData: Task = await request.json();

  if (request.method === "POST") {
    return await createTask(formData);
  }
};

export default appAction;
