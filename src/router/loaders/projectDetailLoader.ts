// Util import
import { getClerkUserId } from "@/lib/utils";

// Appwrite import
import { databases } from "@/lib/appwrite";

// Type import
import type { LoaderFunction } from "react-router";

const fetchProjectDetail = async (projectId: string) => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    return userId;
  }

  try {
    const project = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
      projectId
    );

    if (project.userId !== userId) {
      throw new Error("Unauthorized user!");
    }

    return project;
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error loading projects!";
    console.error("Failed to load project detail:", errMsg);

    throw new Error(`Failed to load project detail: ${errMsg}`);
  }
};

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  try {
    const project = await fetchProjectDetail(projectId);

    // If "fetchProjectDetail" returns a Response (meaning userId was not found), return it immediately
    if (project instanceof Response) {
      return project;
    }

    return { project };
  } catch (err) {
    console.error("Error loading project detail:", err);

    return new Response("Failed to load project detail!", { status: 500 });
  }
};

export default projectDetailLoader;
