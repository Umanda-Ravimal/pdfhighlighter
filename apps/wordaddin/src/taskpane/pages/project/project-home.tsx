import { Paper, Stack } from "@my-workspace/packages-atoms";
import { useTranslation } from "react-i18next";
import { ActionBar } from "@my-workspace/packages-molecules";
import { PromptBar, ConversationBar } from "../../components/index";
import { ReferencePage, UploadSourcePage } from "@my-workspace/packages-organisms";
import { useLocation, useNavigate } from "react-router-dom";
import { useMetaDataStore, useUploadSourceStore } from "@my-workspace/packages-zustand";
import { useEffect } from "react";
import { setupDocumentSelectionHandler } from "@my-workspace/packages-common";

const ProjectHome = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const uploadSourse = useUploadSourceStore(({ uploadSourceComponent }) => uploadSourceComponent);
  const view = urlParams.get("view");
  const responceData = useMetaDataStore(({ responceData }) => responceData);

  useEffect(() => {
    TrackChanges();
  }, []);

  const TrackChanges = async () => {
    // compareDocumentWithMetaData();
    // pollForChanges((newText) => {
    //   console.log("Document changed. New text:", newText);
    // });
    setupDocumentSelectionHandler((text, key) => {});
  };

  return (
    <Stack width={"auto"} height="100vh" alignItems="center">
      <Paper variant="container">
        <ActionBar />
        {view === "create" && (
          <>
            {/* <EditorPage /> */}
            {uploadSourse && <UploadSourcePage />}
            <ConversationBar />
          </>
        )}
        {view === "createwithsource" && (
          <>
            {/* <EditorPage /> */}
            <UploadSourcePage />
            <ConversationBar />
          </>
        )}
        {(!view || view === "folder") && (
          <>
            <UploadSourcePage />
            {responceData && responceData.length > 0 && <ConversationBar />}
          </>
        )}

        {view === "references" && (
          <>
            <ReferencePage />
            <ConversationBar />
          </>
        )}
        {view === "settings" && <></>}
        <PromptBar />
      </Paper>
    </Stack>
  );
};

export { ProjectHome };
