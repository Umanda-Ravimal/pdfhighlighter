import { create } from 'zustand';

interface File {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
}

interface Record {
  id: string;
  description: string | null;
  date: string;
  title: string;
  number: string | null;
  venue: string | null;
  pages: string | null;
  projectId: string;
  createdBy: string;
  created_at: string;
  updated_at: string;
  status: string;
  key: string | null;
  files: File[];
  tags: any[];
  authors: any[];
}

interface fetchSources {
  count: number;
  records: Record[];
}

interface State {
  fileData: File[];
  fetchSources: fetchSources | null;
  selectedFiles: Set<string>;
  filteredRecords: Record[];
  searchQuery: string;
}

interface Actions {
  setFileData: (data: File[]) => void;
  removeFile: (fileName: string) => void;
  clearFileData: () => void;
  setfetchSources: (data: fetchSources) => void;
  toggleFileSelection: (fileId: string) => void;
  selectAllReadyFiles: () => void;
  selectAllReadySearchFiles: () => void;
  filterRecords: (query: string) => void;
  deselectAllFiles: () => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchSourceStore = create<State & Actions>((set) => ({
  fileData: [],
  fetchSources: null,
  selectedFiles: new Set(),
  filteredRecords: [],
  searchQuery: '',

  setFileData: (data) => set({ fileData: data }),
  removeFile: (fileName) =>
    set((state) => ({
      fileData: state.fileData.filter((file) => file.name !== fileName),
    })),
  clearFileData: () => set({ fileData: [] }),
  setfetchSources: (data) => set({ fetchSources: data }),

  toggleFileSelection: (fileId) =>
    set((state) => {
      const newSelectedFiles = new Set(state.selectedFiles);
      if (newSelectedFiles.has(fileId)) {
        newSelectedFiles.delete(fileId);
      } else {
        newSelectedFiles.add(fileId);
      }
      return { selectedFiles: newSelectedFiles };
    }),

  selectAllReadyFiles: () =>
    set((state) => {
      const readyFiles =
        state.fetchSources?.records
          .filter((file) => file.status === 'ready')
          .map((file) => file.id) || [];
      return { selectedFiles: new Set(readyFiles) };
    }),

  selectAllReadySearchFiles: () =>
    set((state) => {
      const readyFiles =
        state.filteredRecords
          .filter((file) => file.status === 'ready')
          .map((file) => file.id) || [];
      return { selectedFiles: new Set(readyFiles) };
    }),
    
  deselectAllFiles: () => set({ selectedFiles: new Set() }),

  // filterRecords: (query) =>
  //   set((state) => {
  //     console.log('Filtering records with query:', query);
  //     const filtered = query.trim()
  //       ? state.fetchSources?.records.filter((record) =>
  //           record.title.toLowerCase().includes(query.toLowerCase())
  //         ) || []
  //       : [];
  //     console.log('Filtered records:', filtered);
  //     return { filteredRecords: filtered , searchQuery: query };
  //   }),
    
  setSearchQuery: (query) => set({ searchQuery: query }),
  filterRecords: (query) =>
    set((state) => {
      console.log('Filtering records with query:', query);
      const filtered = query.trim()
        ? state.fetchSources?.records.filter((record) =>
            record.title?.toLowerCase?.().includes(query.toLowerCase())
          ) || []
        : [];
      console.log('Filtered records:', filtered);
      return { filteredRecords: filtered, searchQuery: query };
    }),


}));
