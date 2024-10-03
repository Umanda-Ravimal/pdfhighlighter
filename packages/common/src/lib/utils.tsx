// /// <reference types="office-js" />

// import { useMetaDataStore } from '@my-workspace/packages-zustand';


// export function openDialog(
//   HTMLUrl: string,
//   options: Office.DialogOptions,
//   messageHandler?: (arg: object, dialog: { close: () => void }) => void
// ) {
//   Office.context.ui.displayDialogAsync(HTMLUrl, options, (asyncResult) => {
//     if (asyncResult.status === Office.AsyncResultStatus.Failed) {
//       switch (asyncResult.error.code) {
//         case 12004:
//           console.log('Domain is not trusted');
//           break;
//         case 12005:
//           console.log('HTTPS is required');
//           break;
//         case 12007:
//           console.log('A dialog is already opened.');
//           break;
//         default:
//           console.log(asyncResult.error.message);
//           break;
//       }
//     } else {
//       const dialog = asyncResult.value;
//       if (messageHandler) {
//         dialog.addEventHandler(
//           Office.EventType.DialogMessageReceived,
//           (message: any) => messageHandler(message, dialog)
//         );
//       }
//       dialog.addEventHandler(
//         Office.EventType.DialogEventReceived,
//         eventHandler
//       );
//     }
//   });
// }
// const eventHandler = (event: any) => {
// };

// export async function insertText(text: string) {
//   try {
//     await Word.run(async (context) => {
//       const selection = context.document.getSelection();
//       const paragraph = selection.paragraphs.getFirst(); 
//       paragraph.insertParagraph(text, Word.InsertLocation.after);
//       await context.sync();
//       // console.log('Inserted text:', text);
//     });
//   } catch (error) {
//     console.log('Error inserting text:', error);
//   }
// }

// // create new empty paragraph with collection
// export const createNewEmptyBlock = async () => {
//   const { blockId, setblockId ,selectedblockId, setSelectedBlockId , metadata } = useMetaDataStore.getState();
//   let Id ;
//   try {
//     await Word.run(async (context) => {
//       const selection = context.document.getSelection();
//       const body = context.document.body;
//       selection.load('text');
//       await context.sync();
//       const hasDataForCurrentBlock = metadata.some((item) => item.blockId === blockId);
//       let nextBlockId = blockId;

//       if (hasDataForCurrentBlock) {
//         nextBlockId = 'block1';
//         if (blockId) {
//           const match = blockId.match(/block(\d+)/);
//           if (match) {
//             const currentBlockNumber = parseInt(match[1], 10);
//             nextBlockId = `block${currentBlockNumber + 1}`;
//           }
//         }
//       }
//       const newParagraph = body.insertParagraph('', Word.InsertLocation.end);
//       newParagraph.load('uniqueLocalId');
//       await context.sync();
//       newParagraph.select();   
//       setblockId(nextBlockId);
//       setSelectedBlockId(nextBlockId);
//       Id = nextBlockId
//       await context.sync();
//     });

//     return Id;
//   } catch (error) {
//     console.error('Error creating new paragraph:', error);
//     throw error;
//   }
// };

// // this method for add new paragraph
// export const paragraphAdded = async (text: string , responseMetadataKey : string) => {
//   const { blockId , selectedblockId ,setSelectedBlockId  } = useMetaDataStore.getState();
//   if (!selectedblockId) {
//     console.error("No paragraph block ID found. Please create a new paragraph block first.");
//     return;
//   }
//   await Word.run(async (context) => {
//     const body = context.document.body;
//     const paragraphs = text.split("\n\n");
//     const paragraphIds: string[] = [];
//     for (const paraText of paragraphs) {
//       const newParagraph = body.insertParagraph(paraText, Word.InsertLocation.end);
//       newParagraph.load('uniqueLocalId');
//       await context.sync();
//       paragraphIds.push(newParagraph.uniqueLocalId);
//     }
//   });
// };

// // This function for find which paragraph is in now. 
// export const setupDocumentSelectionHandler = (handleSelection: (text: string, key?: string) => void) => {
//   getParaKey();

//   Office.onReady(() => {
//     Office.context.document.addHandlerAsync(
//       Office.EventType.DocumentSelectionChanged,
//       () => {
//         Word.run(async (context) => {
//           const { metadata, updateSelectedStatus, updateLinkedStatus , setSelectedBlockId , setblockId } = useMetaDataStore.getState();

//           const selection = context.document.getSelection();
//           const paragraph = selection.paragraphs.getFirst();
//           paragraph.load(['text', 'uniqueLocalId']);
//           await context.sync();

//           const paragraphs = context.document.body.paragraphs;
//           paragraphs.load(['uniqueLocalId', 'text']);
//           await context.sync();
          
//           metadata.forEach((meta) => {
//             const foundParagraph = paragraphs.items.find((para) => para.uniqueLocalId === meta.key);
//             if (foundParagraph) {
//               const paragraphText = foundParagraph.text.trim(); // Get the trimmed paragraph text

//               if (paragraphText === "") {
//                 updateLinkedStatus(meta.key, false);
//               } else {
//                 updateLinkedStatus(meta.key, true);
//               }
//             } else {
//               updateLinkedStatus(meta.key, false);
//             }
//           });

//           const uniqueKey = paragraph.uniqueLocalId;
//           let matchingKey: string | undefined;
//           const matchingMetadata = metadata.find((item) => item.key === uniqueKey);
//           if (matchingMetadata) {
//             const blockId = matchingMetadata.blockId;
//             updateSelectedStatus(uniqueKey);
//             setSelectedBlockId(blockId);
         
//           }
//           handleSelection(paragraph.text, matchingKey);
//         }).catch((error) => {
//           console.error('Error handling selection change:', error);
//         });
//       }
//     );
//   });
//   return () => {
//     Office.context.document.removeHandlerAsync(
//       Office.EventType.DocumentSelectionChanged
//     );
//   };
// };

// const eventContexts: any[] = [];
// const getParaKey = async () => {
//   await Word.run(async (context) => {
//     eventContexts[0] = context.document.onParagraphAdded.add(paragraphChanged);
//     eventContexts[1] = context.document.onParagraphChanged.add(paragraphChanged);
//     await context.sync();
//   });
// };

// const paragraphChanged = async (args: Word.ParagraphChangedEventArgs) => {
//   await Word.run(async (context) => {
//     const allParagraphs = context.document.body.paragraphs;
//     allParagraphs.load('items');
//     await context.sync();

//     allParagraphs.items.forEach(para => para.load('uniqueLocalId, text'));
//     await context.sync();

//     const orderedResults = allParagraphs.items
//       .filter(para => args.uniqueLocalIds.includes(para.uniqueLocalId)) // Ensure that uniqueLocalId is loaded before accessing
//       .map(para => ({
//         uniqueKey: para.uniqueLocalId,
//         responseText: para.text.trim() // Trim to remove leading/trailing whitespace
//       }));

//     const { metadata, addMetadata, updateSavedResponse, blockId,selectedblockId, deleteSavedResponse , updateLinkedStatus , matchedResponses , updateMatchedResponse } = useMetaDataStore.getState();
//     for (const result of orderedResults) {
//       const { uniqueKey, responseText } = result;
//       const existingResponseIndex = metadata.findIndex((item) => item.key === uniqueKey);
//       const isDuplicate = metadata.some((item) => item.response === responseText);

//       if (existingResponseIndex !== -1) {
//         if (responseText === '' || responseText === '\r') {
//           // If the response is empty or just a carriage return, delete it
//           deleteSavedResponse(uniqueKey);
//         } else {
//           // Update the saved response
//           updateSavedResponse(uniqueKey, responseText);
//           updateMatchedResponse(uniqueKey, responseText)
//           updateLinkedStatus(uniqueKey, true);
//         }
//       } else if (responseText !== '' && responseText !== '\r') {
//         if (!isDuplicate) {
//           const linked = true;
//           addMetadata(responseText, uniqueKey, linked, selectedblockId);
//         } else {
//           // Update metadata's key with the new uniqueKey when duplicate is found
//           metadata.forEach((item) => {
//             if (item.response === responseText) {
//               item.key = uniqueKey; // Update the key with the new uniqueKey
//             }
//           });
//           matchedResponses.forEach((item) => {
//             if (item.filteredResponse === responseText) {
//               item.paragraphId = uniqueKey; // Update the key with the new uniqueKey
//             }
//           });
//         }
//       }
//     }
    
//   }).catch((error) => {
//     console.error("Error handling paragraph changes:", error);
//   });
// };


// // export function pollForChanges(
// //   updateCallback: (paragraphsText: string[]) => void
// // ) {
// //   // getParaKey();
// //   let previousTexts: string[] = [];
// //   let isRunning = false;
// //   setInterval(() => {
// //     if (isRunning) return;
// //     isRunning = true;

// //     Word.run(async (context) => {
// //       const body = context.document.body;
// //       const paragraphs = body.paragraphs;
// //       paragraphs.load('items');
// //       await context.sync();

// //       const currentTexts: string[] = paragraphs.items.map((p) => p.text);
// //       let hasChanged = false;
// //       if (currentTexts.length !== previousTexts.length) {
// //         hasChanged = true;
// //       } else {
// //         for (let i = 0; i < currentTexts.length; i++) {
// //           if (currentTexts[i] !== previousTexts[i]) {
// //             hasChanged = true;
// //             break;
// //           }
// //         }
// //       }
// //       if (hasChanged) {
// //         previousTexts = [...currentTexts];
// //         // await checkForTrackedChanges(paragraphs.items);
// //         updateCallback(currentTexts);
// //       }
// //     })
// //       .catch((error) => {
// //         console.log('Error polling for changes: ' + error);
// //       })
// //       .finally(() => {
// //         isRunning = false;
// //       });
// //   }, 1000);
// // }

// // const checkForTrackedChanges = async (paragraphs: Word.Paragraph[]) => {
// //   console.log('checkForTrackedChanges');
// //   const { metadata, updateSavedResponse, updateLinkedStatus } =
// //     useMetaDataStore.getState();
// //   try {
// //     metadata.forEach((responseItem) => {
// //       const similarityThreshold = 0.5;
// //       let isLinked = false;

// //       // Check each paragraph against the current saved response
// //       paragraphs.forEach((paragraph) => {
// //         const similarity = levenshtein.get(
// //           paragraph.text,
// //           responseItem.response
// //         );
// //         const maxLen = Math.max(
// //           paragraph.text.length,
// //           responseItem.response.length
// //         );
// //         const similarityPercentage = 1 - similarity / maxLen;

// //         // If a match is found
// //         if (similarityPercentage >= similarityThreshold) {
// //           isLinked = true; // Mark as linked
// //           console.log(Matching response found for key: ${responseItem.key});
// //           updateSavedResponse(responseItem.key, paragraph.text);
// //         }
// //       });

// //       // Update the linked status based on whether a match was found
// //       if (!isLinked) {
// //         console.log(Unlinking response for key: ${responseItem.key});
// //         updateLinkedStatus(responseItem.key, false);
// //       } else {
// //         updateLinkedStatus(responseItem.key, true); // Ensure it's linked if matched
// //       }
// //     });
// //   } catch (error) {
// //     console.log('Error checking for tracked changes:', error);
// //   }
// // };

// // export const compareDocumentWithMetaData = async () => {
// //   console.log('compareDocumentWithMetaData');
// //   const { metaData, addMetadata, metadata } =
// //     useMetaDataStore.getState();
// //   console.log('compareDocumentWithMetaData');
// //   try {
// //     await Word.run(async (context) => {
// //       const body = context.document.body;
// //       const paragraphs = body.paragraphs;
// //       paragraphs.load('items');
// //       await context.sync();

// //       paragraphs.items.forEach((paragraph) => {
// //         const paragraphText = paragraph.text;
// //         metaData.forEach((dataItem) => {
// //           const responseText = dataItem.response;
// //           const distance = levenshtein.get(paragraphText, responseText);
// //           const maxLen = Math.max(paragraphText.length, responseText.length);
// //           const similarity = 1 - distance / maxLen; // Calculate similarity percentage

// //           if (similarity > 0.5) {
// //             // Match found with more than 50% similarity
// //             const isAlreadySaved = metadata.some(
// //               (saved) => saved.key === dataItem.key
// //             );
// //             console.log(
// //               `Match found with ${similarity * 100}% similarity for key: ${
// //                 dataItem.key
// //               }`
// //             );
// //             // Add this response to metadata in Zustand store
// //             if (!isAlreadySaved) {
// //               // Add this response to metadata in Zustand store
// //               const linked = true;
// //               addMetadata(paragraphText, dataItem.key, linked);
// //             } else {
// //               console.log(
// //                 Response with key: ${dataItem.key} is already saved.
// //               );
// //             }
// //           }
// //         });
// //       });
// //     });
// //   } catch (error) {
// //     console.log('Error comparing document with metaData:', error);
// //   }
// // };

// // This method for paragraph select part




// //Highrlight Paragraph By ID
// export const highlightParagraphById = async (paragraphId: string) => {
//   try {
//     await Word.run(async (context) => {
//       const paragraphs = context.document.body.paragraphs;
//       paragraphs.load("items");
//       await context.sync();

//       for (let i = 0; i < paragraphs.items.length; i++) {
//         const paragraph = paragraphs.items[i];
//         paragraph.load('uniqueLocalId');
//         await context.sync();

//         if (paragraph.uniqueLocalId === paragraphId) {
//           paragraph.select();
//           await context.sync();
//           break;
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error highlighting paragraph:', error);
//     throw error;
//   }
// };


// //Delete Block By ID
// export const deleteBlockById = async (blockId: string) => {
//   const { metadata , deleteMetadataByBlockId , deleteMatchedResponsesByBlockId } = useMetaDataStore.getState();
//   const relatedParagraphs = metadata
//     .filter((meta) => meta.blockId === blockId)
//     .map((meta) => meta.key); // Assuming `key` is the paragraph's unique identifier
//   if (relatedParagraphs.length === 0) {
//     console.error(`No paragraphs found for block ID ${blockId}.`);
//     return;
//   }
//   try {
//     await Word.run(async (context) => {
//       const paragraphs = context.document.body.paragraphs;
//       paragraphs.load("items");
//       await context.sync();
//       paragraphs.items.forEach((paragraph) => {
//         paragraph.load("uniqueLocalId");
//       });
//       await context.sync();
//       paragraphs.items.forEach((paragraph) => {
//         if (relatedParagraphs.includes(paragraph.uniqueLocalId)) {
//           paragraph.delete();  // Delete the paragraph
//         }
//       });

//       await context.sync();
//     });
//     deleteMetadataByBlockId(blockId);
//     deleteMatchedResponsesByBlockId(blockId)
//   } catch (error) {
//     console.error('Error deleting block:', error);
//     throw error;
//   }
// };

// // Delete the paragraph by uniqueLocalId
// export const deleteParagraph = async (paragraphId: string): Promise<void> => {
//   try {
//     return await Word.run(async (context :any) => {
//       const body = context.document.body;
//       const paragraphs = body.paragraphs;

//       // Load all paragraphs to search for the one with the given uniqueLocalId
//       paragraphs.load('items');
//       await context.sync();

//       // Find the paragraph with the matching uniqueLocalId
//       const targetParagraph = paragraphs.items.find(
//         (p :any) => p.uniqueLocalId === paragraphId
//       );
//       if (targetParagraph) {
//         // If the paragraph is found, delete it
//         targetParagraph.delete();
//         console.log('Deleted paragraph with ID:', paragraphId);
//       } else {
//         console.error('Paragraph with ID:', paragraphId, 'not found.');
//       }

//       // Synchronize the deletion with Word
//       await context.sync();
//     });
//   } catch (error) {
//     console.error('Error deleting paragraph:', error);
//     throw error;
//   }
// };
