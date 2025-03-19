// Util import
import { getClerkUserId } from "@/lib/utils";

// Type imports
import type { Models } from "appwrite";
import type { ActionFunction } from "react-router";
import type { Project, ProjectFormData } from "@/types/types";

// Appwrite imports
import { databases, ID } from "@/lib/appwrite";

// Library import
import { redirect } from "react-router";

// API imports
import { generateProjectTasks } from "@/api/geminiAPI";

type AIGeneratedTask = {
  content: string;
  due_date: Date | null;
};

const DB_ID: string = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECTS_COLLECTION_ID: string = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID;
const TASKS_COLLECTION_ID: string = import.meta.env
  .VITE_APPWRITE_TASKS_COLLECTION_ID;

const createProject = async (data: ProjectFormData) => {
  const userId = getClerkUserId();

  if (userId instanceof Response) {
    // Stop execution and return the redirect response
    return userId;
  }

  let project: Models.Document | null = null;

  const shouldAIGenerateProject = data.ai_generated;
  const projectPrompt = data.generation_prompt;
  let aiGeneratedTasks: AIGeneratedTask[] = [];

  // Set up a project in the database
  try {
    project = await databases.createDocument(
      DB_ID,
      PROJECTS_COLLECTION_ID,
      ID.unique(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId,
      }
    );
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error creating project!";
    console.error("Error creating project:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Retrieve Gemini generated tasks
  if (shouldAIGenerateProject) {
    try {
      const aiResponse = await generateProjectTasks(projectPrompt);

      try {
        const parsedResponse = JSON.parse(aiResponse) as unknown;

        if (Array.isArray(parsedResponse)) {
          aiGeneratedTasks = parsedResponse as AIGeneratedTask[]; // Valid response
        } else {
          console.warn("Unexpected AI response format:", parsedResponse);
          aiGeneratedTasks = [];
        }
      } catch (err) {
        console.error("Error parsing AI response:", err);
        aiGeneratedTasks = [];
      }
    } catch (err) {
      console.error("Error processing AI-generated tasks:", err);
      aiGeneratedTasks = [];
    }
  }

  // Set Gemini generated tasks associated with the previosuly created project in the database
  if (project && aiGeneratedTasks.length > 0) {
    const aiGeneratedTaskPromises: Promise<Models.Document>[] =
      aiGeneratedTasks.map((task) => {
        return databases.createDocument(
          DB_ID,
          TASKS_COLLECTION_ID,
          ID.unique(),
          {
            // The default value of the "completed" attribute for tasks is set to false in the database
            ...task,
            project: project.$id,
            userId,
          }
        );
      });

    try {
      await Promise.all(aiGeneratedTaskPromises);
    } catch (err) {
      console.error("Error creating AI-generated project tasks:", err);

      return new Response(
        JSON.stringify({ error: "Failed to create AI-generated tasks!" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const deleteProject = async (data: Project) => {
  const docId = data.id; // Project ID

  if (!docId) {
    throw new Error("Missing project ID");
  }

  try {
    await databases.deleteDocument(DB_ID, PROJECTS_COLLECTION_ID, docId);
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error deleting project!";
    console.error("Error deleting project:", errMsg);

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const projectsAction: ActionFunction = async ({ request }) => {
  try {
    const formData: ProjectFormData = await request.json();

    if (request.method === "POST") {
      return await createProject(formData);
    } else if (request.method === "DELETE") {
      return await deleteProject(formData);
    }
  } catch (err) {
    console.error("Failed to process the request:", err);

    return new Response("Invalid request body!", { status: 400 });
  }
};

export default projectsAction;
