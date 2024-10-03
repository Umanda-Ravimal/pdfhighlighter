import { useCallback } from 'react';
import {
  Stack,
  Typography,
  Button,
  Paper,
  Container,
} from '@my-workspace/packages-atoms';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@my-workspace/packages-molecules';
import { useSearchSourceStore } from '@my-workspace/packages-zustand';
import { ImportSource, FolderSource } from '@my-workspace/packages-molecules';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppRoutes } from '@my-workspace/packages-common';
import { useAppNavigation } from '@my-workspace/packages-common';


const ImportPage = () => {
  const selectedFiles = useSearchSourceStore(({ selectedFiles }) => selectedFiles);
  const filterRecords = useSearchSourceStore(({ filterRecords }) => filterRecords);

  const { t } = useTranslation();
  const { Navigate } = useAppNavigation();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const folder = urlParams.get('folder');

  interface SearchInputChangeEvent
    extends React.ChangeEvent<HTMLInputElement> {}
  const handleSearchInputChange = useCallback(
    (e: SearchInputChangeEvent) => {
      const query = e.target.value;
      filterRecords(query);
    },
    [filterRecords]
  );

  return (
    <Paper variant="containerTwo">
      <Stack direction={'column'}>
        <Typography variant="h3">{t('import_sources_from_kc')}</Typography>

        {folder && folder !== '' && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            onClick={() => Navigate(AppRoutes.IMPORT_PAGE)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <ArrowBackIcon />
            <Typography variant="subtitle2">{t(folder)}</Typography>
          </Stack>
        )}

        <SearchBar
          name="Search"
          placeholder={t('search')}
          onChange={handleSearchInputChange}
        />
      </Stack>

      {folder ? <FolderSource /> : <ImportSource />}
      <Stack direction={'column'} height={'auto'} justifyContent={'flex-end'}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Button>
            <Typography variant="button">{t('cancel')}</Typography>
          </Button>
          <Button variant="button1" disabled={selectedFiles.size === 0}>
            <Typography variant="button">
              {folder ? t('import_selection') : t('import_all')}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export { ImportPage };
