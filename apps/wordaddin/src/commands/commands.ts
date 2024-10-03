/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { getSliceAsync } from "./helpers";

/* global Office */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event: Office.AddinCommands.Event) {
  const message: Office.NotificationMessageDetails = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message.
  Office.context.mailbox.item?.notificationMessages.replaceAsync("ActionPerformanceNotification", message);

  // Be sure to indicate when the add-in command function is complete.
  event.completed();
}

// Register the function with Office.
Office.actions.associate("action", action);

function eventHandler(arg:any) {
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
  HTMLUrl:any,
  options: Office.DialogOptions,
  messageHandler: (message: object, dialog:any) => void
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
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, (message) => messageHandler(message, dialog));

      /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
      dialog.addEventHandler(Office.EventType.DialogEventReceived, eventHandler);
    }
  });
}


export async function setProjectIdProperty(value: string) {
  return Word.run(async (context) => {
    const properties: Word.CustomPropertyCollection = context.document.properties.customProperties;
    properties.load("key,type,value");
    await context.sync();
    const customProperty = properties.items.find((property) => property.key === "projectId");
    if (customProperty) {
      customProperty.set({
        value,
      });
      await context.sync();
    } else {
      properties.add("projectId", value);
      await context.sync();
    }
  });
}


export async function loadFromBase64(dataUrl: string) {
  if (!dataUrl) return;
  const startIndex = dataUrl.indexOf("base64,");
  const base64 = dataUrl.substring(startIndex + 7);
  return Word.run(async (context) => {
    await context.document.insertFileFromBase64(base64, Word.InsertLocation.replace, {
      importTheme: true,
      importStyles: true,
      importParagraphSpacing: true,
      importPageColor: true,
      importChangeTrackingMode: true,
      importCustomProperties: true,
      importCustomXmlParts: true,
      importDifferentOddEvenPages: true,
    });
    await context.sync();
  });
}


export function getDocumentBase64(): Promise<string> {
  return new Promise((resolve, reject) => {
    Office.context.document.getFileAsync(
      Office.FileType.Compressed,
      { sliceSize: 4194304 /*64 KB*/ },
      function (result) {
        // @ts-expect-error
        if (result.status === "succeeded") {
          // If the getFileAsync call succeeded, then
          // result.value will return a valid File Object.
          const myFile = result.value;
          const sliceCount = myFile.sliceCount;
          const slicesReceived = 0,
            gotAllSlices = true,
            docdataSlices = <any>[];

          // Get the file slices.
          getSliceAsync(myFile, 0, sliceCount, gotAllSlices, docdataSlices, slicesReceived, (result: string) => {
            if (result) {
              resolve(result);
            } else {
              reject();
            }
          });
        } else {
          reject(result.error);
          console.log("Error:", result.error.message);
          // app.showNotification("Error:", result.error.message);
        }
      }
    );
  });
}

export async function getProjectIdProperty() {
  return Word.run(async (context) => {
    const properties: Word.CustomPropertyCollection = context.document.properties.customProperties;
    properties.load("key,type,value");
    await context.sync();
    const customProperty = properties.items.find((property) => property.key === "projectId");
    return customProperty?.toJSON();
  });
}


export async function deleteProjectIdProperty() {
  try {
    return Word.run(async (context) => {
      const properties = context.document.properties.customProperties;
      properties.load("items");
      await context.sync();
      const property = properties.items.find((p) => p.key === "projectId");

      if (property) {
        property.delete();
        await context.sync();
        console.log(`Deleted 'projectId' property`);
      } else {
        console.log(`Property 'projectId' not found.`);
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
