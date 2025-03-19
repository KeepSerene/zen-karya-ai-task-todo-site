// Appwrite imports
import { databases, ID } from "@/lib/appwrite";

// Util import
import { getClerkUserId } from "@/lib/utils";

// Type imports
import type { ActionFunction } from "react-router";
import type { Task } from "@/types/types";

const DB_ID: string = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TASKS_COLLECTION_ID: string = import.meta.env
  .VITE_APPWRITE_TASKS_COLLECTION_ID;

const createTask = async (data: Task) => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    // Stop execution and return the redirect response
    return userId;
  }

  try {
    return await databases.createDocument(
      DB_ID,
      TASKS_COLLECTION_ID,
      ID.unique(),
      { ...data, userId }
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error creating task!";
    console.error("Error creating task:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
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
      DB_ID,
      TASKS_COLLECTION_ID,
      docId,
      data // Update payload
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error updating task!";
    console.error("Error updating task:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const deleteTask = async (data: Task) => {
  const docId = data.id; // Task ID

  if (!docId) {
    throw new Error("Missing task ID");
  }

  try {
    await databases.deleteDocument(DB_ID, TASKS_COLLECTION_ID, docId);
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error deleting task!";
    console.error("Error deleting task:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
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
    } else if (request.method === "DELETE") {
      return await deleteTask(formData);
    }
  } catch (err) {
    console.error("Failed to process the request:", err);

    return new Response("Invalid request body!", { status: 400 });
  }
};

export default appAction;
