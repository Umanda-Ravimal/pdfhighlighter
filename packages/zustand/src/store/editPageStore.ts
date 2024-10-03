// src/store/useIconStore.ts
import { create } from '@my-workspace/packages-zustand';

interface sourceStore {
  uploadSourceComponent: boolean;
  setUploadSourceComponent: (value: boolean) => void;
}

const useUploadSourceStore = create<sourceStore>((set) => ({
  uploadSourceComponent: false,
  setUploadSourceComponent: (value: boolean) =>
    set({ uploadSourceComponent: value }),
}));

export { useUploadSourceStore };
