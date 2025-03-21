// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Util import
import { getClerkUserId } from "@/lib/utils";

// Library & type imports
import { startOfToday, startOfTomorrow } from "date-fns";
import type { TaskCount } from "@/types/types";
import { redirect, type LoaderFunction } from "react-router";
import type { Models } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID;
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID;

const fetchProjects = async (userId: string) => {
  try {
    return await databases.listDocuments(DB_ID, PROJECTS_COLLECTION_ID, [
      Query.select(["$id", "$createdAt", "name", "color_name", "color_hex"]),
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading projects!";
    console.error("Failed to load projects:", errMsg);

    throw new Error(`Failed to load projects: ${errMsg}`);
  }
};

const getTaskCount = async (userId: string) => {
  const taskCount: TaskCount = {
    inbox: 0,
    today: 0,
  };

  // Set inbox's task count
  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      DB_ID,
      TASKS_COLLECTION_ID,
      [
        Query.select(["$id"]),
        Query.limit(1),
        Query.isNull("project"),
        Query.equal("completed", false),
        Query.equal("userId", userId),
      ]
    );

    taskCount.inbox = totalInboxTasks;
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Failed to load inbox task count!";
    console.error(errMsg);

    throw new Error("Failed to load inbox task count!");
  }

  // Set today's task count
  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      DB_ID,
      TASKS_COLLECTION_ID,
      [
        Query.select(["$id"]),
        Query.limit(1),
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()),
          Query.lessThan("due_date", startOfTomorrow().toISOString()),
        ]),
        Query.equal("completed", false),
        Query.equal("userId", userId),
      ]
    );

    taskCount.today = totalTodayTasks;
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Failed to load today task count!";
    console.error(errMsg);

    throw new Error("Failed to load today task count!");
  }

  return taskCount;
};

const appLoader: LoaderFunction = async () => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    return redirect("/login");
  }

  let projects: Models.DocumentList<Models.Document>;
  let taskCount: TaskCount;

  // Set projects
  try {
    projects = await fetchProjects(userId);
  } catch (err) {
    console.error("Error loading projects:", err);

    return new Response("Failed to load projects!", { status: 500 });
  }

  // Set taskCount
  try {
    taskCount = await getTaskCount(userId);
  } catch (err) {
    console.error("Error loading task counts:", err);

    return new Response("Failed to load task counts!", { status: 500 });
  }

  return { projects, taskCount };
};

export default appLoader;
