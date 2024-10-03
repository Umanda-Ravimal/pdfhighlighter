import React, { useCallback } from "react";
import { Button, Typography, Box, Stack } from "@my-workspace/packages-atoms";
import { useTranslation } from "react-i18next";

const FileUploadModal: React.FC = () => {
  const { t } = useTranslation();

  const uploadFiles = useCallback(() => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput.files) {
      const files = Array.from(fileInput.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      Office.context.ui.messageParent(JSON.stringify(files));
    }
  }, []);

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Typography variant="body2">
        {t("select_files_to_upload")}
      </Typography>
      <input type="file" id="fileInput" multiple />
      <Button onClick={uploadFiles} variant="contained">
        {t("upload")}
      </Button>
    </Stack>
  );
};

export { FileUploadModal };
