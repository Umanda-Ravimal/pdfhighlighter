import { Divider, Menu, MenuItem } from '@mui/material';
import { Badge, Button, Stack, Typography } from '@my-workspace/packages-atoms';
import { useTranslation } from 'react-i18next';
import React, { useState, useCallback, useMemo } from 'react';
import {
  AddOutlined as AddIcon,
  ArrowRight,
  CloudDownloadOutlined,
  SaveOutlined,
  Sync,
  Share,
  UnarchiveOutlined,
  PendingActions,
} from '@mui/icons-material';
import { AppRoutes, useDialog } from '@my-workspace/packages-common';
import { useMetaDataStore } from '@my-workspace/packages-zustand';
import { useNavigate } from 'react-router-dom';

const ActionDropdown = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const metadata = useMetaDataStore(({ metadata }) => metadata);

  const notLinkedMetadata = useMemo(() => {
    return metadata.filter((entry) => entry.linked !== true);
  }, [metadata]);

  // State for the main menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // State for the Save As submenu
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const submenuOpen = Boolean(submenuAnchorEl);

  // const { handleSaveClick, handleSyncChange } = useDialog();

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    handleMenuClose();
  }, [handleMenuClose]);

  const handleVersionClick = useCallback(() => {
    navigate(AppRoutes.VERSION_HISTORY);
    handleMenuClose();
  }, [handleMenuClose]);

  // Handle opening the Save As submenu
  const handleSubmenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setSubmenuAnchorEl(event.currentTarget);
    },
    []
  );

  // Handle closing the Save As submenu
  const handleSubmenuClose = useCallback(() => {
    setSubmenuAnchorEl(null);
  }, []);

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleMenuClick}>
        <Typography variant="button">{t('actions')}</Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuItemClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack direction="row" alignItems="center" width="100%" gap={2}>
              <AddIcon fontSize="small" />
              <Typography variant="h6">{t('create_new_simple')}</Typography>
            </Stack>
            <ArrowRight fontSize="small" />
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleMenuItemClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack direction="row" alignItems="center" width="100%" gap={2}>
              <CloudDownloadOutlined fontSize="small" />
              <Typography variant="h6">{t('import_collection')}</Typography>
            </Stack>
            <ArrowRight fontSize="small" />
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleSubmenuClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack direction="row" alignItems="center" width="100%" gap={2}>
              <SaveOutlined fontSize="small" />
              <Typography variant="h6">{t('save_as')}</Typography>
            </Stack>
            <ArrowRight fontSize="small" />
          </Stack>
        </MenuItem>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Divider sx={{ width: '90%' }} orientation="horizontal" />
        </Stack>

        <MenuItem
          onClick={(e) => {
            // handleSyncChange('sync-page', e);
            handleMenuClose();
          }}
        >
          <Stack direction="row" alignItems="center" width="100%" gap={2}>
            <Sync fontSize="small" />
            <Typography variant="h6">{t('sync_changes')}</Typography>
            {notLinkedMetadata.length > 0 && (
              <Badge color="error" badgeContent={notLinkedMetadata.length} />
            )}
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick}>
          <Stack direction="row" alignItems="center" width="100%" gap={2}>
            <Share fontSize="small" />
            <Typography variant="h6">{t('share')}</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick}>
          <Stack direction="row" alignItems="center" width="100%" gap={2}>
            <UnarchiveOutlined fontSize="small" />
            <Typography variant="h6">{t('archive')}</Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleVersionClick}>
          <Stack direction="row" alignItems="center" width="100%" gap={2}>
            <PendingActions fontSize="small" />
            <Typography variant="h6">{t('version_history')}</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      {/* Submenu for "Save As" */}
      <Menu
        anchorEl={submenuAnchorEl}
        open={submenuOpen}
        onClose={handleSubmenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
        // onClick={(e) => handleSaveClick('save-page', e)}
        >
          <Typography variant="h6">{t('project')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick}>
          <Typography variant="h6">{t('template')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export { ActionDropdown };
