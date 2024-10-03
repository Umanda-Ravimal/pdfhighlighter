import { useCallback, useMemo, useState } from 'react';
import { openDialog } from '@my-workspace/packages-common';
import { useAuthStore, useMetaDataStore } from '@my-workspace/packages-zustand';
import { useSessionStore } from '@my-workspace/packages-zustand';
import { APP_BASE_URL } from '@my-workspace/api';

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

const useDialog = () => {
  const { createSession, setUser } = useAuthStore();
  const setSession = useSessionStore(({ setSession }) => setSession);
  const metadata = useMetaDataStore(({ metadata }) => metadata);

  const notLinkedMetadata = useMemo(() => {
    return metadata.filter((entry) => entry.linked !== true);
  }, [metadata]);


  const handleSignIn = useCallback(
    (arg: object, dialog: { close: () => void }) => {
      // Ensure arg has a message property of string type
      if (typeof arg === 'object' && arg !== null && 'message' in arg) {
        const { message } = arg as { message: string };
        const session: Session = JSON.parse(message);
        setSession(session);

        const tokens = {
          accessToken: session.accessToken.jwtToken,
          idToken: session.idToken.jwtToken,
          refreshToken: session.refreshToken.token,
        };
        const user = {
          id: session.idToken?.payload?.aud,
          email: session.idToken?.payload?.email,
          name: session.accessToken?.payload?.username,
        };

        createSession(tokens);
        setUser(user);
        dialog.close();
      }
    },
    [createSession, setUser]
  );

  const handleSignUpClick = useCallback(
    (page: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      openDialog(
        `${APP_BASE_URL}/taskpane.html?page=${page}`,
        {
          promptBeforeOpen: false,
          displayInIframe: true,
          width: 60,
          height: 80,
        },
        handleSignIn
      );
    },
    [handleSignIn]
  );

  const handleLoginClick = useCallback(
    (page: string, e: any) => {
      e.preventDefault();
      openDialog(
        `${APP_BASE_URL}/taskpane.html?page=${page}`,
        {
          promptBeforeOpen: false,
          displayInIframe: true,
          width: 60,
          height: 80,
        },
        handleSignIn
      );
    },
    [handleSignIn]
  );

  const handleViewSource = useCallback(async (file: any) => {
    const url = file?.files[0]?.url;
    try {
      openDialog(
        `${APP_BASE_URL}/taskpane.html?page=view-source&source=${url}`,
        {
          promptBeforeOpen: false,
          displayInIframe: true,
         
        }
      );
    } catch (error) {
      throw error;
    }
  }, []);

  // const handleSaveClick = useCallback((page: string, e: any) => {
  //   e.preventDefault();
  //   openDialog(`${APP_BASE_URL}/taskpane.html?page=${page}`, {
  //     promptBeforeOpen: false,
  //     displayInIframe: true,
  //     width: 40,
  //     height: 52,
  //   });
  // }, []);


  const handleSyncChange = useCallback((page: string, e: any) => {
    // e.preventDefault();
    const storedMetaData = localStorage.getItem('updatedmetadata');
    const encodedMetaData = storedMetaData ? encodeURIComponent(storedMetaData) : '';
    openDialog(`${APP_BASE_URL}/taskpane.html?page=${page}&metadata=${encodedMetaData}`, {
      promptBeforeOpen: false,
      displayInIframe: true,
      width: 30,
      height: 52,
    });
  }, []);

  const handleUnsyncChange = useCallback((page: string, e: any) => {
    e.preventDefault();
    openDialog(`${APP_BASE_URL}/taskpane.html?page=${page}&count=${notLinkedMetadata.length}`, {
      promptBeforeOpen: false,
      displayInIframe: true,
      width: 30,
      height: 20,
    });
  }, []);

  // const handleAddVersion = useCallback((page: string, e: any) => {
  //   e.preventDefault();
  //   openDialog(`${APP_BASE_URL}/taskpane.html?page=${page}`, {
  //     promptBeforeOpen: false,
  //     displayInIframe: true,
  //     width: 30,
  //     height: 40,
  //   });
  // }, []);


  return {
    handleSignUpClick,
    handleLoginClick,
    handleViewSource,
    // handleSaveClick,
    handleSyncChange,
    handleUnsyncChange,
    // handleAddVersion,
  };
};

export { useDialog };
