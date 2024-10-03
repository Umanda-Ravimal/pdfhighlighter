import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import userPool from './userPool';
import { useEnvStore } from '@my-workspace/packages-zustand';

export type SignUpArgs = {
  username: string;
  email: string;
  password: string;
};

export const signUp = (args: SignUpArgs): Promise<ISignUpResult> => {
  const { cognitoUserPool, GQL_URL } = useEnvStore();

  return new Promise((resolve, reject) => {
    const { username, password, email } = args;
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];
    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('call result: ', result);
      resolve(result!);
    });
  });
};

export type SignInArgs = {
  username: string;
  password: string;
};

export const signIn = ({
  username,
  password,
}: SignInArgs): Promise<CognitoUserSession> => {
  // const { cognitoUserPool } = useEnvStore.getState();
  // if (!cognitoUserPool) {
  //   return Promise.reject(new Error('Cognito user pool is not initialized'));
  // }

  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('login successful');
        resolve(result);
      },
      onFailure: (err) => {
        console.log('login failed', err);
        reject(err);
      },
    });
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
      resolve(undefined);
    } else {
      reject(new Error('User is not logged in!'));
    }
  });
};

export const confirmSignUp = (username: string, code: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    user.confirmRegistration(code, false, (err, result) => {
      if (err) {
        console.log('Failed to confirm:', err);
        return reject(err);
      } else {
        console.log('Confirmed:', result);
        return resolve(result);
      }
    });
  });
};

export const initResetPassword = (username: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    user.forgotPassword({
      onSuccess: function (data) {
        resolve(data);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};

export const confirmPassword = (args: {
  username: string;
  newPassword: string;
  verificationCode: string;
}) => {
  const { username, newPassword, verificationCode } = args;
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err),
    });
  });
};

export const resendAccountActivationCode = (username: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export { userPool };
