import { Stack, Button, Badge } from '@my-workspace/packages-atoms';
import { ActionDropdown } from '@my-workspace/packages-molecules';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@my-workspace/packages-common';
import { AppRoutes, useAppNavigation } from '@my-workspace/packages-common';
import { buttonModel } from '@my-workspace/packages-molecules';
import { useActionStore, useMetaDataStore } from '@my-workspace/packages-zustand';

const ActionBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { Navigate } = useAppNavigation();

  const metadata = useMetaDataStore(({ metadata }) => metadata);
  const setActiveView = useActionStore(({ setActiveView }) => setActiveView);
  const activeView = useActionStore(({ activeView }) => activeView);

  const notLinkedMetadata = useMemo(() => {
    return metadata.filter((entry) => entry.linked !== true);
  }, [metadata]);

  const urlParams = new URLSearchParams(location.search);
  const view = urlParams.get('view');

  useEffect(() => {
    setActiveView(view || '');
  }, [view]);

  const getButtonVariant = useCallback(
    (view: string) => (activeView === view ? 'buttonClicked' : 'text'),
    [activeView]
  );

  const handleButtonClick = useCallback(
    (url: `${AppRoutes}?view=${string}`) => {
      Navigate(url);
    },
    [Navigate]
  );

  const memoizedButtons = useMemo(() => {
    return buttonModel?.slice(1)?.map((button) => (
      <Button
        key={button.type}
        variant={getButtonVariant(button.type)}
        onClick={() => handleButtonClick(button.url)}
      >
        <button.icon />
      </Button>
    ));
  }, [buttonModel, activeView, handleButtonClick]);

  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems="center" height="auto">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Button
            variant="iconButton"
            onClick={() => handleButtonClick(buttonModel[0]?.url)}
          >
            <FormatListBulletedIcon />
          </Button>
          {notLinkedMetadata.length > 0 ? (
            <Badge
              variant="dot"
              color="error"
              badgeContent=" "
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <ActionDropdown />
            </Badge>
          ) : (
            <ActionDropdown />
          )}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="auto"
        >
          {memoizedButtons}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export { ActionBar };
