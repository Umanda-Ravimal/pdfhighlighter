import React, { ReactNode } from "react";
import { redirectToPage } from "../../utils";
import { useAuth } from "../../hook";

type ProtectedPageProps = {
  children: ReactNode;
};

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { idToken, accessToken, refreshToken } = useAuth();

  if (!idToken || !accessToken || !refreshToken) {
    redirectToPage("home");
    return null;
  }

  return <div>{children}</div>;
};

export { ProtectedPage };
