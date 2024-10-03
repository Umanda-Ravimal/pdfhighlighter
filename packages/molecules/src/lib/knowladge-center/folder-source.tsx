import {
  Box,
  Paper,
  Container,
  Button,
  Stack,
  Typography,
} from '@my-workspace/packages-atoms';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { useSourceService } from '@kelsen-labs/api';
import { useSearchSourceStore } from '@my-workspace/packages-zustand';
import fetchSources from '../../../../api/src/lib/sources/mockData.json';
import { useMemo } from 'react';

const FolderSource = () => {
  const selectedFiles = useSearchSourceStore(({ selectedFiles }) => selectedFiles);
  // const filteredRecords = useSearchSourceStore(({ filteredRecords }) => filteredRecords);
  const selectAllReadyFiles = useSearchSourceStore(({ selectAllReadyFiles }) => selectAllReadyFiles);
  const deselectAllFiles = useSearchSourceStore(({ deselectAllFiles }) => deselectAllFiles);
  const toggleFileSelection = useSearchSourceStore(({ toggleFileSelection }) => toggleFileSelection);

  // const { getEncodedPDF } = useSourceService();

  const allReadyFilesSelected =
    fetchSources?.data.records
      .filter((file :any) => file.status === 'ready')
      .every((file :any) => selectedFiles.has(file.id)) || false;

  const handleSelectAllChange = () => {
    if (allReadyFilesSelected) {
      deselectAllFiles();
    } else {
      selectAllReadyFiles();
    }
  };

  const { t } = useTranslation();

  const fileItems = useMemo(() => {
    return fetchSources?.data.records.map((file :any, index :any) => (
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
          <Typography
            variant="blueText"
            component="a"
            rel="noopener noreferrer"
          >
            {file.title}
          </Typography>
        </Box>
        <Button>
          <Typography variant="button">{t('import')}</Typography>
        </Button>
      </Stack>
    ));
  }, [fetchSources, selectedFiles, toggleFileSelection, t]);

  return (
    <Paper variant="folderContainer">
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
            label={allReadyFilesSelected ? t('deselect_all') : t('select_all')}
          />
          <Stack
            width="auto"
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button>
              <Typography variant="button">{t('import')}</Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack direction="column" height={'auto'}>
          {fileItems}
        </Stack>
      </Stack>
    </Paper>
  );
};

export { FolderSource };
