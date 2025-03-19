// Util import
import { getClerkUserId } from "@/lib/utils";

// Appwrite imports
import { databases, Query } from "@/lib/appwrite";

// Type import
import type { LoaderFunction } from "react-router";

const fetchProjects = async () => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    return userId;
  }

  try {
    return await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
      [
        Query.select(["$id", "$createdAt", "name", "color_name", "color_hex"]),
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading projects!";
    console.error("Failed to load projects:", errMsg);

    throw new Error(`Failed to load projects: ${errMsg}`);
  }
};

const projectsLoader: LoaderFunction = async () => {
  try {
    const projects = await fetchProjects();

    // If "fetchProjects" returns a Response (meaning userId was not found), return it immediately
    if (projects instanceof Response) {
      return projects;
    }

    return { projects };
  } catch (err) {
    console.error("Error loading projects:", err);

    return new Response("Failed to load projects!", { status: 500 });
  }
};

export default projectsLoader;
