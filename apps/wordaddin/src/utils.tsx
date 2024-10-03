import {
  ForgotPasswordPage,
  Home,
  OrganizationHome,
  ProjectHome,
  ProjectMainPage,
  SetPasswordPage,
  SignInPage,
  SignUpPage,
  VerifyAccountPage,
} from "./taskpane/pages";

export type Page =
  | "sign-in"
  | "sign-up"
  | "verify-account"
  | "home"
  | "forgot-password"
  | "set-password"
  | "project-home"
  | "project-main"
  | "organization-main";

export const redirectToPage = (page: Page, params?: object) => {
  const urlParams = params
    ? Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";
  window.location.replace(`/taskpane.html?page=${page}${urlParams.length ? "&" + urlParams : ""}`);
};

// export const renderPage = (page: Page) => {
//   switch (page) {
//     case "sign-in":
//       return <SignInPage />;
//     case "sign-up":
//       return <SignUpPage />;
//     case "verify-account":
//       return <VerifyAccountPage />;
//     case "forgot-password":
//       return <ForgotPasswordPage />;
//     case "set-password":
//       return <SetPasswordPage />;
//     case "project-home":
//       return <ProjectHome />;
//     case "project-main":
//       return <ProjectMainPage />;
//     case "organization-main":
//       return <OrganizationHome />;
//     default:
//       return <Home />;
//   }
// };

function eventHandler(arg :any) {
  // In addition to general system errors, there are 2 specific errors
  // and one event that you can handle individually.
  switch (arg.error) {
    case 12002:
      console.log("Cannot load URL, no such page or bad URL syntax.");
      break;
    case 12003:
      console.log("HTTPS is required.");
      break;
    case 12006:
      // The dialog was closed, typically because the user the pressed X button.
      console.log("Dialog closed by user");
      break;
    default:
      console.log("Undefined error in dialog window");
      break;
  }
}

export function openDialog(
  HTMLUrl: string,
  options: Office.DialogOptions,
  messageHandler?: (arg: object, dialog: { close: () => void }) => void
) {
  Office.context.ui.displayDialogAsync(HTMLUrl, options, (asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      // In addition to general system errors, there are 3 specific errors for
      // displayDialogAsync that you can handle individually.
      switch (asyncResult.error.code) {
        case 12004:
          console.log("Domain is not trusted");
          break;
        case 12005:
          console.log("HTTPS is required");
          break;
        case 12007:
          console.log("A dialog is already opened.");
          break;
        default:
          console.log(asyncResult.error.message);
          break;
      }
    } else {
      let dialog = asyncResult.value;
      /*Messages are sent by developers programatically from the dialog using office.context.ui.messageParent(...)*/
      if (messageHandler) {
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (message) => messageHandler(message, dialog));
      }

      /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
      dialog.addEventHandler(Office.EventType.DialogEventReceived, eventHandler);
    }
  });
}

export async function insertText(text: string) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      // eslint-disable-next-line prefer-const
      let body = context.document.body;
      body.insertParagraph(text, Word.InsertLocation.end);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
