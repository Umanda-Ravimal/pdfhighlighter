const useEnvironment = () => {
  return {
    baseUrl: "https://localhost:3000/taskpane.html?page=sign-in",
    signUpUrl: "https://localhost:3000/taskpane.html?page=sign-up",
    forgotPasswordUrl: "https://localhost:3000/taskpane.html?page=forgot-password",
  };
};

export { useEnvironment };
