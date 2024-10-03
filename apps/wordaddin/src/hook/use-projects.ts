import { useEffect } from "react";
import useLocalStorage from "./use-local-storage";

function useProjects(userId: string) {
  const [projects, setProjects] = useLocalStorage("projects", []);

  const createProject = (project:any) => {
    setProjects([...projects, project]);
    return project;
  };

  const updateProject = (id:any, updatedData:any) => {
    setProjects(projects.map((project:any) => (project.id === id ? { ...project, ...updatedData } : project)));
  };

  const deleteProject = (id:any) => {
    setProjects(projects.filter((project:any) => project.id !== id));
  };

  const getProject = (id:any) => {
    return projects.find((project:any) => project.id === id);
  };

  return {
    projects: projects.filter((project:any) => project.userId === userId),
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}

export default useProjects;
