import React, { useEffect, useMemo, useState } from "react";
import { Button, Typography, Stack, Paper, Badge } from "@my-workspace/packages-atoms";
import { useTranslation } from "react-i18next";
import { Sync } from "@mui/icons-material";
import { Divider, ListItem, ListItemText } from "@mui/material";
import { useSyncService } from "@my-workspace/packages-api";
import { useMetaDataStore } from "@my-workspace/packages-zustand";


type ChangeItem = {
  response: string;
  key: string;
  linked: boolean;
  selected: boolean;
  blockId: string;
};

const SyncPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [metadata, setMetadata] = useState<ChangeItem[]>([]);

  useEffect(() => {
    getMetaData();
  }, []);

  const getMetaData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedMetaData = urlParams.get("metadata");

    if (encodedMetaData) {
      const metaData = JSON.parse(decodeURIComponent(encodedMetaData));
      setMetadata(metaData);
    } else {
      console.log("No metadata found in URL");
    }
  };
  const { t } = useTranslation();

  const handleClick = (item: ChangeItem) => {
    console.log("Item clicked:", item);
  };

  const changesData = metadata.filter((entry) => entry.linked !== true);

  const getTruncatedText = (text: string) => {
    const words = text.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  return (
    <Paper variant="containerTwo">
      <Stack direction={"column"} spacing={"2px"}>
        <Typography variant="h3">{t("sync_change")}</Typography>
        <Divider />
        <Paper variant="sourceContainer" sx={{ maxHeight: "270px" }}>
          {changesData.map((item, index) => (
            <Stack key={index} direction={"column"} spacing={"10px"}>
              {/* <ListItem button onClick={() => handleClick(item)}>
                <ListItemText
                  primary={
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" spacing={3}>
                      <Badge variant="dot" color="error" />
                      <Typography variant="body1">
                        <Typography component="span" fontWeight="bold">
                          {"Paragraph removed"}
                        </Typography>
                        {" - "}
                        <Typography component="span" color="textSecondary">
                          {getTruncatedText(item.response)}
                        </Typography>
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem> */}
            </Stack>
          ))}
        </Paper>
        <Stack direction={"column"} height={"auto"} justifyContent={"flex-end"}>
          <Button variant="button1">
            <Sync /> <Typography variant="button">{t("sync_change")}</Typography>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export { SyncPage };
