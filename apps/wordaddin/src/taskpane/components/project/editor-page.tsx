// import { Stack, Box, Typography, IconButton, Switch, Button, Paper } from "@my-workspace/packages-atoms";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { AddOutlined as AddIcon, ContentCopyOutlined as CopyIcon, ArrowUpwardOutlined as ArrowUpIcon, ArrowDownwardOutlined as ArrowDownIcon, DeleteOutlined as DeleteIcon, DashboardCustomizeOutlined as CustomizeIcon, FolderOutlined as FolderIcon} from "@mui/icons-material";
// import { useMetaDataStore, useUploadSourceStore } from "@my-workspace/packages-zustand";
// import { insertText, createNewEmptyBlock, highlightParagraphById, deleteBlockById } from "@my-workspace/packages-common";
// import { useMetadataService } from "@my-workspace/packages-api"; 
// // import DiffMatchPatch from 'diff-match-patch';
// import { useDialog } from '@my-workspace/packages-common';

// const EditorPage = () => {
//   const { t } = useTranslation();
//   const [isFolderIcon, setIsFolderIcon] = useState<boolean>(false);
//   const [showLimitedRows, setShowLimitedRows] = useState<boolean>(false);
//   const metadata = useMetaDataStore(({ metadata }) => metadata);
//   const selectedblockId = useMetaDataStore(({ selectedblockId }) => selectedblockId);
//   const setSelectedBlockId = useMetaDataStore(({ setSelectedBlockId }) => setSelectedBlockId);
//   const matchedResponses = useMetaDataStore(({ matchedResponses }) => matchedResponses);
//   const setMatchedResponses = useMetaDataStore(({ setMatchedResponses }) => setMatchedResponses);
//   const responceData = useMetaDataStore(({ responceData }) => responceData);
//   const { createBlock } = useMetadataService();
//   const { handleUnsyncChange } = useDialog();
//   const { setUploadSourceComponent } = useUploadSourceStore();

//   useEffect(() => {
//     const isFirstVisit = !sessionStorage.getItem("hasVisitedThisSession");
//     if (isFirstVisit) {
//       handleUnsyncChange("unsync-page", true);
//       sessionStorage.setItem("hasVisitedBefore", "true");
//     }
//   }, [handleUnsyncChange]);

//   const handleButtonClick = useCallback(() => {
//     setUploadSourceComponent(true);
//     setIsFolderIcon((prev) => !prev);
//   }, [setUploadSourceComponent]);

//   const handleIconToggle = useCallback(() => { setIsFolderIcon((prev) => !prev)}, []);
//   const handleSwitchToggle = useCallback(() => { setShowLimitedRows((prev) => !prev)}, []);

//   const getTruncatedText = (text: string) => {
//     const words = text.split(" ");
//     return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
//   };

//   // const createNewBlock = async () => {
//   //   const blockId = await createNewEmptyBlock();
//   //   createBlock(blockId);
//   // };

//   // Arrow up function with useCallback
//   const arrowUp = useCallback(() => {
//     const allblockIds = metadata
//       .map((entry) => entry.blockId)
//       .filter((id): id is string => id !== null)
//       .filter((value, index, self) => self.indexOf(value) === index);
//     const currentIndex = allblockIds.indexOf(selectedblockId);
//     const previousblockId = currentIndex > 0 ? allblockIds[currentIndex - 1] : allblockIds[allblockIds.length - 1];
//     setSelectedBlockId(previousblockId);
//   }, [metadata, selectedblockId, setSelectedBlockId]);

//   // Arrow down function with useCallback
//   const arrowDown = useCallback(() => {
//     const allblockIds = metadata
//       .map((entry) => entry.blockId)
//       .filter((id): id is string => id !== null)
//       .filter((value, index, self) => self.indexOf(value) === index);
//     const currentIndex = allblockIds.indexOf(selectedblockId);
//     const nextblockId = currentIndex < allblockIds.length - 1 ? allblockIds[currentIndex + 1] : allblockIds[0];
//     setSelectedBlockId(nextblockId);
//   }, [metadata, selectedblockId, setSelectedBlockId]);

//   const selectParagraph = async (key: string) => {
//     await highlightParagraphById(key);
//   };

//   const deleteBlock = async (blockId: string) => {
//     await deleteBlockById(blockId);
//   };

//   const filteredMetadata = useMemo(() => { return metadata.filter((entry) => entry.blockId === selectedblockId)}, [metadata, selectedblockId]);
//   const responce = useMemo(() => { return responceData.filter((entry) => entry.blockId === selectedblockId)}, [responceData, selectedblockId]);
//   const processedResponseData = useMemo(() => {
//     return responce.flatMap((entry) => {
//       const paragraphs = entry.response.split("\n\n");
//       return paragraphs.map((paragraph) => ({
//         response: paragraph,
//       }));
//     });
//   }, [responce]);
  
//   const setMatchedResponse = (newData: { filteredResponse: string; paragraphId:string; processedResponse: string; blockId: string }) => {
//     const isAlreadyMatched = matchedResponses.some((item) => item.processedResponse === newData.processedResponse);
//     if (!isAlreadyMatched) {
//       setMatchedResponses(newData);
//     }
//   };

//   // const dmp = new DiffMatchPatch();
//   // const highlightChanges = (original: string, modified: string) => {
//   //   const diffs = dmp.diff_main(original, modified);
//   //   dmp.diff_cleanupSemantic(diffs);
//   //   return diffs
//   //     .map(([type, text]) => {
//   //       if (type === DiffMatchPatch.DIFF_INSERT) {
//   //         return `<span style="text-decoration: underline; text-decoration-color: red;">${text}</span>`;
//   //       }
//   //       if (type === DiffMatchPatch.DIFF_DELETE) {
//   //         return `<span style="text-decoration: line-through; text-decoration-color: red;">${text}</span>`;
//   //       }
//   //       return text;
//   //     })
//   //     .join("");
//   // };

//   const calculateSimilarity = (text1: string, text2: string) => {
//     const diffs = dmp.diff_main(text1, text2);
//     const totalLength = text1.length + text2.length;
//     let commonLength = 0;

//     diffs.forEach(([type, text]) => {
//       if (type === 0) {
//         commonLength += text.length;
//       }
//     });
//     return (commonLength * 2) / totalLength; // Similarity ratio (0 to 1)
//   };

//   useEffect(() => {
//     metadata.forEach((filteredItem) => {
//       const processedItem = processedResponseData.find((processed) => {
//         const similarity = calculateSimilarity(filteredItem.response, processed.response);
//         return similarity >= 0.8; 
//       }); 
//       setMatchedResponse({
//         filteredResponse: filteredItem.response,
//         processedResponse: processedItem ? processedItem.response : null,
//         paragraphId: filteredItem.key,
//         blockId: filteredItem.blockId,
//       });
//     });
//   }, [metadata, processedResponseData, setMatchedResponse]);
  

//   const matchedEntries = useMemo(() => {
//     return filteredMetadata.map(entry => ({
//       ...entry,
//       matched: matchedResponses.find(matched => matched.paragraphId === entry.key)
//     }));
//   }, [filteredMetadata, matchedResponses]);
  

//   return (
//     <Stack height={"auto"}>
//       <Paper variant="borderBox">
//         <Stack>
//           <Typography variant="header">{t("editor")}</Typography>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" width="auto" height="auto">
//             <Typography variant="body1">{t("show_block_limits")}</Typography>
//             <Switch checked={showLimitedRows} onChange={handleSwitchToggle} />
//           </Stack>
//           <Stack height={"auto"}>
//             <Typography
//               variant="body1"
//               sx={{
//                 fontWeight: "bold", // Bold the text when selected
//                 textDecoration: "underline", // Optionally add underline
//               }}
//             >
//               {selectedblockId}
//             </Typography>
//             {filteredMetadata.length > 0 ? (
//               <Paper variant="blockBox">
//                 <Stack direction="column" spacing={1}>
//                  {matchedEntries.map((entry, index) => {
//                     const processedItem = entry.matched ? entry.matched.processedResponse : null;
//                     const highlightedText = processedItem
//                       ? highlightChanges(processedItem, entry.response)
//                       : entry.response;

//                     return (
//                       <Stack
//                         key={entry.key}
//                         direction="row"
//                         spacing={0.5}
//                         height="auto"
//                         mt={1}
//                         onClick={() => selectParagraph(entry.key)}
//                         sx={{
//                           cursor: "pointer",
//                         }}
//                       >
//                         <Typography
//                           variant="body1"
//                           color={entry.selected ? "primary" : "textPrimary"}
//                           sx={{
//                             fontWeight: entry.selected ? "bold" : "inherit", // Bold the text when selected
//                             textDecoration: entry.selected ? "underline" : "none", // Optionally add underline
//                           }}
//                         >
//                           {index + 1}.
//                         </Typography>
//                         <Typography
//                           variant="body1"
//                           sx={{
//                             fontWeight: entry.selected ? "bold" : "inherit", // Bold the text when selected
//                           }}
//                           dangerouslySetInnerHTML={{
//                             __html: showLimitedRows
//                               ? getTruncatedText(highlightedText) // Truncate and highlight the text if limited rows are shown
//                               : highlightedText, // Show the full highlighted text otherwise
//                           }}
//                         />
//                         {entry.linked !== true && <Button onClick={() => insertText(entry.response)}>Add</Button>}
//                       </Stack>
//                     );
//                   })}
//                 </Stack>
//               </Paper>
//             ) : (
//               <Paper variant="dashBox">
//                 <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
//                   <Typography variant="body2">{t("empty_block")}</Typography>
//                 </Stack>
//               </Paper>
//             )}

//             <Stack direction="row" justifyContent="space-between" alignItems="center" height={"auto"}>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" width="auto">
//                 <Button variant="borderButton" onClick={createNewBlock}>
//                   <AddIcon fontSize="small" />
//                 </Button>
//                 <Button variant="borderButton" >
//                   <CopyIcon fontSize="small" />
//                 </Button>
//                 <Button variant="borderButton" onClick={arrowDown}>
//                   <ArrowDownIcon fontSize="small" />
//                 </Button>
//                 <Button variant="borderButton" onClick={arrowUp}>
//                   <ArrowUpIcon fontSize="small" />
//                 </Button>
//                 <Button variant="borderButton" onClick={() => deleteBlock(selectedblockId)}>
//                   <DeleteIcon fontSize="small" />
//                 </Button>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" width="auto">
//                 {isFolderIcon && (
//                   <Button variant="borderButtonBlue" onClick={() => handleButtonClick()}>
//                     <FolderIcon fontSize="small" />
//                   </Button>
//                 )}
//                 <Button variant="borderButtonBlue" onClick={handleIconToggle}>
//                   <CustomizeIcon fontSize="small" />
//                 </Button>
//               </Stack>
//             </Stack>

//           </Stack>
//         </Stack>
//       </Paper>
//     </Stack>
//   );
// };

// export { EditorPage };
