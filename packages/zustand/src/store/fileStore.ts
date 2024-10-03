// store/uploadStore.ts
import { create } from "zustand";

interface CustomFile {
  url: string;
  id: string;
  name: string;
  size: number;
  type: string;
}

interface UploadStore {
  files: CustomFile[];
  addFiles: (newFiles: CustomFile[]) => void;
  removeFile: (fileName: string) => void;
  clearFiles: () => void;
}

const useFileStore = create<UploadStore>((set) => ({
  files: [],
  addFiles: (newFiles) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),

  removeFile: (fileName) =>
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    })),
  clearFiles: () =>
    set(() => ({
      files: [],
    })),
}));

export { useFileStore };
