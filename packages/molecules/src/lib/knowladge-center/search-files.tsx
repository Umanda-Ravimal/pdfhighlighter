import { useSearchSourceStore } from '@my-workspace/packages-zustand';
import { Box, Paper, Container, Stack, Typography } from '@my-workspace/packages-atoms';
import { FormControlLabel, IconButton } from '@mui/material';
import { Checkbox } from '@mui/material';
import { CloudDownloadOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ExtractingBox } from '@my-workspace/packages-molecules';
import { useCallback, useMemo } from 'react';
import { useDialog } from '@my-workspace/packages-common';

const SearchFiles = () => {
  const selectedFiles = useSearchSourceStore(
    ({ selectedFiles }) => selectedFiles
  );
  const deselectAllFiles = useSearchSourceStore(({ deselectAllFiles }) => deselectAllFiles);
  const toggleFileSelection = useSearchSourceStore(({ toggleFileSelection }) => toggleFileSelection);
  const selectAllReadySearchFiles = useSearchSourceStore(({ selectAllReadySearchFiles }) => selectAllReadySearchFiles);
  const filteredRecords = useSearchSourceStore(({ filteredRecords }) => filteredRecords);
//   const { handleViewSource } = useDialog()

  const allReadyFilesSelected =
    filteredRecords
      .filter((file) => file.status === 'failed')
      .every((file) => selectedFiles.has(file.id)) || false;

  // Select all or unSelect all
  const handleSelectAllChange = useCallback(() => {
    if (allReadyFilesSelected) {
      deselectAllFiles();
    } else {
      selectAllReadySearchFiles();
    }
  }, [allReadyFilesSelected, deselectAllFiles, selectAllReadySearchFiles]);

  const { t } = useTranslation();

  const fileItems = useMemo(() => {
    return filteredRecords?.map((file, index) => (
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
                disabled={file.status !== 'failed'}
              />
            }
            label=""
          />
          {file.status === 'extracting' ? (
            <Typography
              variant="grayText"
            //   onClick={() => handleViewSource(file)}
            >
              {file.title}
            </Typography>
          ) : file.status === 'ready' ? (
            <Typography
              variant="blueText"
            //   onClick={() => handleViewSource(file)}
              component="a"
              rel="noopener noreferrer"
            >
              {file.title}
            </Typography>
          ) : file.status === 'failed' ? (
            <Typography
              variant="blueText"
            //   onClick={() => handleViewSource(file)}
              component="a"
              rel="noopener noreferrer"
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
  }, [filteredRecords, selectedFiles, toggleFileSelection]);

  return (
    <Paper variant="sourceBox">
      <Container>
        <Stack direction="column" spacing={'5px'}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {filteredRecords.length <= 0 ? (
              <Typography>{t('no_matching_files')}</Typography>
            ) : (
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
            )}
          </Stack>
          <Stack direction="column" height={'auto'}>
            {fileItems}
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export { SearchFiles };
