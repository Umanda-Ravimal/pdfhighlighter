import { Container, Stack, Typography } from '@my-workspace/packages-atoms';
import { SearchBar, SearchFiles } from '@my-workspace/packages-molecules';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import {RemoveSources, FetchSources, BrowseSource, } from '@my-workspace/packages-molecules';
import { useFileStore, useProjectData, useSearchSourceStore, useSourceUrlStore } from '@my-workspace/packages-zustand';
import { useCallback } from 'react';
import { useUploadSourceStore } from '@my-workspace/packages-zustand';

const UploadSourcePage = () => {
  const { t } = useTranslation();
  const setUploadSourceComponent = useUploadSourceStore(({ setUploadSourceComponent }) => setUploadSourceComponent);
  const uploadSourse = useUploadSourceStore(({ uploadSourceComponent }) => uploadSourceComponent);
  const files = useFileStore(({ files }) => files);
  const getFileData = useSourceUrlStore(({ fileData }) => fileData);
  const fetchSources = useSearchSourceStore(({ fetchSources }) => fetchSources);
  const searchQuery = useSearchSourceStore(({ searchQuery }) => searchQuery);
  const filterRecords = useSearchSourceStore(({ filterRecords }) => filterRecords);
  const filteredRecords = useSearchSourceStore(({ filteredRecords }) => filteredRecords);
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);


  // get search bar values
  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      filterRecords(query);
    },
    [filterRecords]
  );

  const handleButtonClick = useCallback(() => {
    setUploadSourceComponent(false);
  }, []);

  return (
    <Stack direction={'column'} spacing={1}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">{t('sources')}</Typography>
        {uploadSourse && (
          <CloseIcon
            onClick={() => handleButtonClick()}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Container>
      <SearchBar
        name="Search"
        placeholder={t('search')}
        onChange={handleSearchInputChange}
      />
      {getFileData?.length > 0 ? (
        <RemoveSources />
      ) : filteredRecords?.length > 0 || searchQuery ? (
        <SearchFiles />
      ) : fetchSources && fetchSources?.records?.length > 0 ? (
        <FetchSources />
      ) : (
        <BrowseSource />
      )}
    </Stack>
  );
};

export { UploadSourcePage };
