// Type import
import type { Models } from "appwrite";

// React imports
import React, { createContext, useContext } from "react";

type ProjectsContextProviderProps = {
  children: React.ReactNode;
  projects: Models.DocumentList<Models.Document>;
};

const ProjectsContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export function ProjectsContextProvider({
  children,
  projects,
}: ProjectsContextProviderProps) {
  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjectsContext = () => useContext(ProjectsContext);
