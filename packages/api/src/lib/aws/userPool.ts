import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useEnvStore } from '@my-workspace/packages-zustand';

// const userPool = new CognitoUserPool({
//     UserPoolId: "ca-central-1_o4Jl9heo5" ,
//     ClientId:  "4uhk1o154umvttj0e9pis26qsh",
// });

const userPool = new CognitoUserPool({
  UserPoolId: 'ca-central-1_keaAxvHL8',
  ClientId: '1nm4pf727du9jcvj7o59p4n2jn',

});

export default userPool;


// const setEnv = useEnvStore.getState().setEnv;
//   const newEnv = {
//     USER_POOL_ID: "ca-central-1_keaAxvHL8",
//     CLIENT_ID: "1nm4pf727du9jcvj7o59p4n2jn",
//     COGNITO_URL: "https://kelsen-ca-central-domain-prod.auth.ca-central-1.amazoncognito.com/",
//   };
//   setEnv(newEnv);