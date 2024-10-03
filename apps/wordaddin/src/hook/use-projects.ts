import { useEffect } from "react";
import useLocalStorage from "./use-local-storage";

function useProjects(userId: string) {
  const [projects, setProjects] = useLocalStorage("projects", []);

  const createProject = (project) => {
    setProjects([...projects, project]);
    return project;
  };

  const updateProject = (id, updatedData) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, ...updatedData } : project)));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const getProject = (id) => {
    return projects.find((project) => project.id === id);
  };

  return {
    projects: projects.filter((project) => project.userId === userId),
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}

export default useProjects;
