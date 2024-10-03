// src/stores/envStore.js
import { create } from 'zustand';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { enableRipple, registerLicense } from '@syncfusion/ej2-base';

interface EnvStore {
  USER_POOL_ID: string;
  CLIENT_ID: string;
  SERVER_URL: string;
  ENV_KEY: string;
  GQL_URL: string;
  COGNITO_URL: string;
  REDIRECT_URI: string;
  REDIRECT_URI_REG: string;
  APP_GTK: string;
  PUBLIC_URL: string;
  cognitoUserPool: CognitoUserPool | null;
  setEnv: (newEnv: Partial<EnvStore>) => void;
}

const useEnvStore = create<EnvStore>((set) => ({
  // Initialize all values as empty strings
  USER_POOL_ID: '',
  CLIENT_ID: '',
  SERVER_URL: '',
  ENV_KEY: '',
  GQL_URL: '',
  COGNITO_URL: '',
  REDIRECT_URI: '',
  REDIRECT_URI_REG: '',
  APP_GTK: '',
  PUBLIC_URL: '',
  cognitoUserPool: null,

  // Function to update all environment variables at once
  setEnv: (newEnv: any) => {
    const { SYNCFUSION_KEY, USER_POOL_ID, CLIENT_ID } = newEnv;

    // Initialize CognitoUserPool with the updated environment variables
    const poolData = {
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
    };

    // Must apply SF license here before loading the React app, as once it gets started, it does not change
    enableRipple(true);
    registerLicense(SYNCFUSION_KEY);

    const cognitoUserPool = new CognitoUserPool(poolData);
    set({ ...newEnv, cognitoUserPool });
  },
}));

export { useEnvStore };
