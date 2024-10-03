import { create } from 'zustand';

interface Token {
  jwtToken: string;
  payload: Record<string, any>;
}

interface RefreshToken {
  token: string;
}

interface Session {
  accessToken: Token;
  idToken: Token;
  refreshToken: RefreshToken;
  clockDrift: number;
}

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export { useSessionStore };
