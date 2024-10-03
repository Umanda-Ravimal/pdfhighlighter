import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  name: string;
};

type State = {
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  user: User | null;
};

type Actions = {
  createSession: (tokens: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setUser: (userData: User) => void;
};

const useAuthStore = create<State & Actions>((set) => ({
  idToken: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  user: null,
  createSession: (tokens) => {
    set({
      idToken: tokens.idToken,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  },
  setUser: (userData) => set({ user: userData }),
}));

export { useAuthStore };
