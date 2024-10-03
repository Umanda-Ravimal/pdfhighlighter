import {
  Box,
  Paper,
  Button,
  Container,
  Stack,
  Typography,
} from '@my-workspace/packages-atoms';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  useLoadingStore,
  useSearchSourceStore,
  useSourceUrlStore,
} from '@my-workspace/packages-zustand';
import { useSourceService } from '@my-workspace/packages-api';
import { useCallback, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const RemoveSources = () => {
  const { t } = useTranslation();

  const getFileData = useSourceUrlStore(({ fileData }) => fileData);
  const removeFile = useSourceUrlStore(({ removeFile }) => removeFile);
  const setLoading = useLoadingStore(({ setLoading }) => setLoading);
  const loading = useLoadingStore(({ loading }) => loading);
  const setfetchSources = useSearchSourceStore(({ setfetchSources }) => setfetchSources);
  const clearFilesData = useSourceUrlStore(({ clearFileData }) => clearFileData);
  const { fetchSources, createNewSources } = useSourceService();

  // remove Item from fileData store
  const handleDelete = useCallback(
    (fileName: string) => {
      removeFile(fileName);
    },
    [removeFile]
  );

  const clearData = useCallback(() => {
    setLoading(false);
    clearFilesData();
  }, []);

  // Batch creste
  const addSources = useCallback(async () => {
    const response = await createNewSources();
    if (response === 'Batch sources created successfully') {
      const responce = await fetchSources();
      setfetchSources(responce);
      clearData();
    } else {
      clearData();
    }
  }, [getFileData]);

  // clear all files
  const clearAllSources = useCallback(() => {
    clearFilesData();
  }, [clearFilesData]);

  const fileItems = useMemo(() => {
    return getFileData?.map((file, index) => (
      <Stack
        key={index}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          sx={{
            textDecoration: 'underline',
          }}
        >
          {file?.name}
        </Typography>
        <IconButton onClick={() => handleDelete(file?.name)}>
          <Delete fontSize="small" />
        </IconButton>
      </Stack>
    ));
  }, [getFileData, handleDelete]);

  return (
    <Paper variant="sourceBox">
      {loading ? (
        <CircularProgress />
      ) : (
        <Container>
          <Stack direction="column">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            ></Stack>
            <Stack direction="column" height={'auto'}>
              {fileItems}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button variant="button1" size="small">
                  <Typography onClick={addSources} variant="button">
                    {t('add')}
                  </Typography>
                </Button>
                <Button variant="button1" size="small">
                  <Typography onClick={clearAllSources} variant="button">
                    {t('close')}
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Paper>
  );
};

export { RemoveSources };
