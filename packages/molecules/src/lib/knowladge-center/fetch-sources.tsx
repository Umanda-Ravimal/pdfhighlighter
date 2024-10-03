import { Paper, Box, Container, Stack, Typography } from '@my-workspace/packages-atoms';
import {
  FormControlLabel,
  IconButton,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { ExtractingBox } from '@my-workspace/packages-molecules';
import { CloudDownloadOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSearchSourceStore } from '@my-workspace/packages-zustand';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDialog } from '@my-workspace/packages-common';
import { useSourceService } from '@my-workspace/packages-api';

const FetchSources = () => {
  // State to control the visibility of the alert
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const fetchSources = useSearchSourceStore(({ fetchSources }) => fetchSources);
  const selectedFiles = useSearchSourceStore(({ selectedFiles }) => selectedFiles);
  const selectAllReadyFiles = useSearchSourceStore(({ selectAllReadyFiles }) => selectAllReadyFiles);
  const deselectAllFiles = useSearchSourceStore(({ deselectAllFiles }) => deselectAllFiles);
  const toggleFileSelection = useSearchSourceStore(({ toggleFileSelection }) => toggleFileSelection);
 
  const { promptFragmentInfo } = useSourceService();
  const selectedFilesArray = useMemo(
    () => Array.from(selectedFiles),
    [selectedFiles]
  );

  const allReadyFilesSelected =
    fetchSources?.records
      .filter((file) => file.status === 'ready')
      .every((file) => selectedFiles.has(file.id)) || false;

  const handleSelectAllChange = useCallback(() => {
    if (allReadyFilesSelected) {
      deselectAllFiles();
    } else {
      selectAllReadyFiles();
    }
  }, [allReadyFilesSelected, deselectAllFiles, selectAllReadyFiles]);

  useEffect(() => {
    promptSelectedSources();
  }, [selectedFilesArray]);

  const promptSelectedSources = useCallback(async () => {
    const response = await promptFragmentInfo();
    setShowAlert(true);
  }, [promptFragmentInfo]);

  const { t } = useTranslation();

  const fileItems = useMemo(() => {
    return fetchSources?.records.map((file, index) => (
      <Stack
        key={index}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFiles.has(file.id)}
                onChange={() => toggleFileSelection(file.id)}
                disabled={file.status !== 'ready'}
              />
            }
            label=""
          />
          {file.status === 'extracting' ||
          file.status === 'idle' ||
          file.status === 'failed' ? (
            <Typography
              variant="grayText"
            //   onClick={() => handleViewSource(file)}
            >
              {file.title}
            </Typography>
          ) : file.status === 'ready' ? (
            <Typography
              variant="blueText"
              component="a"
              rel="noopener noreferrer"
            //   onClick={() => handleViewSource(file)}
            >
              {file.title}
            </Typography>
          ) : null}
        </Box>

        <Box display="flex" alignItems="center">
          {file.status === 'extracting' ? (
            <ExtractingBox />
          ) : file.status === 'ready' ? (
            <IconButton>
              <CloudDownloadOutlined fontSize="small" />
            </IconButton>
          ) : null}
        </Box>
      </Stack>
    ));
  }, [fetchSources, selectedFiles, toggleFileSelection]);

  return (
    <Paper variant="sourceBox">
      <Container>
        <Stack direction="column">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={allReadyFilesSelected}
                  onChange={handleSelectAllChange}
                />
              }
              label={
                allReadyFilesSelected ? t('deselect_all') : t('select_all')
              }
            />
          </Stack>
          <Stack direction="column" height={'auto'} gap="0px">
            {fileItems}
          </Stack>
        </Stack>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          <Typography variant="body3">{t('succes_upload')}</Typography>
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export { FetchSources };
