import { createRoot } from "react-dom/client";
import App from "./app";
import '../i18n/i18n';

// eslint-disable-next-line no-redeclare
/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
      <App />
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./app", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NextApp = require("./app").default;
    root?.render(NextApp);
  });
}
