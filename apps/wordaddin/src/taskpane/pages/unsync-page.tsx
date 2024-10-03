import { Stack, Button, Typography, Paper } from "@my-workspace/packages-atoms";
import { useMetaDataStore } from "@my-workspace/packages-zustand";
import { Sync } from "@mui/icons-material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "@my-workspace/packages-common";

const UnsyncPage = () => {
  const { t } = useTranslation();
  const { handleSyncChange } = useDialog();

  const urlParams = new URLSearchParams(window.location.search);
  const count = urlParams.get("count");

  return (
    <Paper variant="container">
      <Stack direction="row" alignItems="center" width="100%" height={"auto"}>
        <Sync />
        <Typography variant="h3">{t("unsync_changes")}</Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="body1">
          {t("this_project_has")} {count} {t("unsynced_changes")}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={"5px"} justifyContent="flex-end" height={"auto"}>
        <Button>
          <Typography variant="button">{t("sync_later")}</Typography>
        </Button>
        <Button
          variant="button1"
          onClick={(e) => {
            handleSyncChange("sync-page", e);
          }}
        >
          <Typography variant="button">{t("sync_now")}</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export { UnsyncPage };
