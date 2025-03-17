// Appwrite imports
import { databases, ID } from "@/lib/appwrite";

// Util import
import { getClerkUserId } from "@/lib/utils";

// Type imports
import type { ActionFunction } from "react-router";
import type { Task } from "@/types/types";

const createTask = async (data: Task) => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    // Stop execution and return the redirect response
    return userId;
  }

  try {
    return await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
      ID.unique(),
      { ...data, userId }
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error creating task!";
    console.error("Error creating task:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const updateTask = async (data: Task) => {
  const docId = data.id; // Task ID

  if (!docId) {
    throw new Error("Missing task ID");
  }

  // Delete the original task ID from the update payload (data) because it need not update
  delete data.id;

  try {
    // Provides "updatedServerTask" with its value after a successful update (see TaskCard)
    return await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
      docId,
      data // Update payload
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error updating task!";
    console.error("Error updating task:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const appAction: ActionFunction = async ({ request }) => {
  try {
    const formData: Task = await request.json();

    if (request.method === "POST") {
      return await createTask(formData);
    } else if (request.method === "PUT") {
      return await updateTask(formData);
    }
  } catch (err) {
    console.error("Failed to process the request:", err);

    return new Response("Invalid request body!", { status: 400 });
  }
};

export default appAction;
