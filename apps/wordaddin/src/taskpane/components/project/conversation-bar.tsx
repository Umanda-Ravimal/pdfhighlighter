import React, { useState, useCallback, useMemo } from "react";
import { Avatar, Rating, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import OpenInFullIcon from "@mui/icons-material/OpenInFullOutlined";
import { useMetaDataStore } from "@kelsen-labs/zustand";
import { SearchBar, LoadingSkeleton } from "@kelsen-labs/molecules";
import { Stack, Typography, IconButton, Button, Paper } from "@kelsen-labs/atoms";
import { paragraphAdded } from "@kelsen-labs/common";

const ConversationBar = () => {
  const { t } = useTranslation();

  const responceData = useMetaDataStore(({ responceData }) => responceData);
  const blocks = useMetaDataStore(({ blocks }) => blocks);
  const setAppliedStatus = useMetaDataStore(({ setAppliedStatus }) => setAppliedStatus);
  const updateFavoriteStatus = useMetaDataStore(({ updateFavoriteStatus }) => updateFavoriteStatus);
  const selectedblockId = useMetaDataStore(({ selectedblockId }) => selectedblockId);

  const [search, setSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false); // Alert state

  // Get search bar values
  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearch(Boolean(e.target.value));
  }, []);

  const filteredMetaData = useMemo(() => {
    return responceData
      .filter((entry) => entry.blockId === selectedblockId) // Filter by blockId
      .filter((entry) => entry.inputValue?.toLowerCase?.().includes(searchTerm.toLowerCase())); // Then apply search filter
  }, [responceData, selectedblockId, searchTerm]);

  const mappedMetaData = useMemo(() => {
    const dataToMap = search ? filteredMetaData : responceData.filter((entry) => entry.blockId === selectedblockId);

    return dataToMap.map((entry) => (
      <Stack key={entry.key} direction="column" spacing={0.5} height="auto" mt={1}>
        <Stack direction="row" spacing={0.5}>
          <Stack direction="column" height="auto" width={"auto"}>
            <Avatar variant="smallTopLeft">H</Avatar>
            <Rating
              name="rating"
              max={1}
              value={entry.favorite ? 1 : 0}
              onChange={(event, newValue) => handleRatingChange(entry.key, newValue)}
            />
          </Stack>
          <Typography variant="body2" color="textPrimary">
            {entry.inputValue}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Avatar variant="blueCircle">k</Avatar>
          {entry.response ? (
            <Stack direction="column" gap="2px" height="auto">
              <Typography variant="body1" color="textSecondary" sx={{ flexGrow: 1 }}>
                {entry.response}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleApplyClick(entry.key, entry.response)}
                >
                  <Typography variant="button" component="span">
                    {t("apply")}
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          ) : (
            <LoadingSkeleton />
          )}
        </Stack>
      </Stack>
    ));
  }, [search, filteredMetaData, responceData, t, selectedblockId]);

  const handleApplyClick = async (key: string, response: string) => {
    await handleTextInsertion(response, key);
    setAppliedStatus(key);
    setShowAlert(true); // Show the alert when text is applied
  };

  const handleTextInsertion = async (response: string, key: string) => {
    await paragraphAdded(response, key);
  };

  const handleRatingChange = (key: string, newValue: number | null) => {
    updateFavoriteStatus(key, Boolean(newValue));
  };

  return (
    <Stack direction="column" spacing={"5px"}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" height={"auto"}>
        <Typography variant="header">{t("conversation")}</Typography>
        <IconButton>
          <OpenInFullIcon fontSize="small" />
        </IconButton>
      </Stack>
      <SearchBar name="Search" placeholder={t("search")} onChange={handleSearchInputChange} />

      {search && filteredMetaData.length === 0 && responceData.length === 0 ? null : (
        <Paper variant="folderContainer">{mappedMetaData}</Paper>
      )}

      {/* Snackbar Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          <Typography variant="body1">{t("succes_applied")}</Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export { ConversationBar };
