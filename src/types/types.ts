type Project = {
  name: string;
  color_name: string;
  color_hex: string;
  userId: string | null;
};

type ProjectForm = {
  id: string | null;
  name: string;
  color_name: string;
  color_hex: string;
  ai_project_gen: boolean;
  project_gen_prompt: string;
};

type Task = {
  id?: string;
  content: string;
  due_date: Date | null;
  completed?: boolean;
  project: Project | null;
  userId: string;
};

type TaskFormData = {
  id?: string;
  content: string;
  due_date: Date | null;
  completed?: boolean;
  project: string | null;
};

export type { Project, ProjectForm, Task, TaskFormData };
