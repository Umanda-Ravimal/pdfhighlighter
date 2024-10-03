import { create } from "zustand";

interface FileData {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface State {
  fileData: FileData[];
}

interface Actions {
  setFileData: (data: FileData[]) => void;
  removeFile: (fileName: string) => void;
  clearFileData: () => void;
}

export const useSourceUrlStore = create<State & Actions>((set) => ({
  fileData: [],
  setFileData: (data) => set({ fileData: data }),
  removeFile: (fileName) =>
    set((state) => ({
      fileData: state.fileData.filter((file) => file.name !== fileName),
    })),
  clearFileData: () => set({ fileData: [] }),
}));
