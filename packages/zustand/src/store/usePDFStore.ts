// src/stores/pdfStore.ts (adjust the path accordingly)
import { create } from 'zustand';

// Define the state and actions
interface PDFStore {
  base64Data: string | null;
  setBase64Data: (data: string) => void;
}

// Create and export the store
export const usePDFStore = create<PDFStore>((set) => ({
  base64Data: null,
  setBase64Data: (data: string) => set({ base64Data: data }),
}));
