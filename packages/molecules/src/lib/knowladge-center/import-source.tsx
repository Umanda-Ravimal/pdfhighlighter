import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Container,
  Button,
} from '@my-workspace/packages-atoms';
import { useTranslation } from 'react-i18next';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import data from './folderData.json';
import { useNavigate } from 'react-router-dom';
import { useSearchSourceStore } from '@my-workspace/packages-zustand';
import { AppRoutes } from '@my-workspace/packages-common';

const ImportSource = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFolderClick = (folderName: string) => {
    navigate(`${AppRoutes.IMPORT_PAGE}?folder=${folderName}`);
  };

  // const fetchSources = useSearchSourceStore(({ fetchSources }) => fetchSources);

  const folderItems = useMemo(() => {
    return data.map((item :any, index :any) => (
      <Stack
        key={index}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyItems="center"
          justifyContent="flex-start"
        >
          <FolderIcon />
          <Typography
            variant="h4"
            onClick={() => handleFolderClick(item.folderName)}
            sx={{
              cursor: 'pointer',
            }}
          >
            {t(item.folderName)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={'5px'}
          justifyContent="flex-end"
        >
          <Button variant="textButton">
            <Typography variant="button">{t('import_all')}</Typography>
          </Button>
          <ChevronRightIcon fontSize="small" />
        </Stack>
      </Stack>
    ));
  }, [data, handleFolderClick, t]);

  return <Paper variant="sourceContainer">{folderItems}</Paper>;
};

export { ImportSource };
