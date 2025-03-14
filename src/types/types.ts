type Project = {
  id: string | null;
  name: string;
  color_name: string;
  color_hex: string;
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
  task: Project | null;
  userId: string;
};

type TaskForm = {
  id?: string;
  content: string;
  due_date: Date | null;
  completed?: boolean;
  taskId: string | null;
};

export type { Project, ProjectForm, Task, TaskForm };
