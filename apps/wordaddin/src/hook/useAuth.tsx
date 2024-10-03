import { useAuthStore } from "@kelsen-labs/zustand";


const useAuth = () => {
  const idToken = useAuthStore((state) => state.idToken);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return { idToken, accessToken, refreshToken, user };
};

export { useAuth };
