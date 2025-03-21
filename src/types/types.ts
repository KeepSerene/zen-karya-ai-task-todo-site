type Project = {
  id: string | null;
  name: string;
  color_name: string;
  color_hex: string;
};

type ProjectFormData = {
  id: string | null;
  name: string;
  color_name: string;
  color_hex: string;
  ai_generated: boolean;
  generation_prompt: string;
};

type Task = {
  id?: string;
  content: string;
  due_date: Date | null;
  completed?: boolean;
  project: Project | null; // The associated project
  userId: string;
};

type TaskFormData = {
  id?: string;
  content: string;
  due_date: Date | null;
  completed?: boolean;
  project: string | null; // The associated project ID
};

type SearchState = "idle" | "loading" | "searching";

type TaskCount = {
  inbox: number;
  today: number;
};

export type {
  Project,
  ProjectFormData,
  Task,
  TaskFormData,
  SearchState,
  TaskCount,
};
