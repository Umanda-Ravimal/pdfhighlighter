import {create} from 'zustand';

interface Data {
  id: string;
  description: string;
  organisationId: string;
  title: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  team: string[]; 
}

// Step 2: Define an interface for your store state and actions
interface DataStore {
  projects: Data[];
  projectData: Data | null; // Initially null or a default value
  activeProjectId: string | null;
  setProjectData: (newData: Data) => void;
  setProjects: (newProjects: Data[]) => void;
  setActiveProjectId: (id: string | null) => void;
  clearProjectData: () => void;
}

// Step 3: Create the Zustand store
export const useProjectData = create<DataStore>((set) => ({
    projectData: null, // Initial state
    projects: [],
    activeProjectId: null,

  setProjects: (newProjects: Data[]) =>
    set(() => ({
       projects: newProjects,
    })),
  
  setProjectData: (newData: Data) =>
    set(() => ({
        projectData: newData,
    })),

    setActiveProjectId: (id: string | null) =>
      set(() => ({
        activeProjectId: id,
      })),

  // Action to clear the data
  clearProjectData: () =>
    set(() => ({
        projectData: null,
    })),
}));
