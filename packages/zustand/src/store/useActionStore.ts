import { create } from 'zustand';

interface State {
  activeView: string;
}

interface Action {
  setActiveView: (view: string) => void;
}

const useActionStore = create<State & Action>((set) => ({
  activeView: '',
  setActiveView: (view) => set({ activeView: view }),
}));

export { useActionStore };
