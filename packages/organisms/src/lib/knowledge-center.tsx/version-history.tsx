import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@my-workspace/packages-atoms';
import { AddOutlined, Close } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  StepContent,
  StepConnector,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes, useDialog } from '@my-workspace/packages-common';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const versions = [
  { user: 'Julia Stone', time: 'June 18, 6:44 pm' },
  { user: 'Julia Stone', time: 'June 18, 3:12 pm' },
  { user: 'Julia Stone', time: 'June 18, 12:05 pm' },
  { user: 'Julia Stone', time: 'June 17, 9:40 am' },
  { user: 'Adam Olsen', time: 'June 16, 2:56 pm' },
  { user: 'Adam Olsen', time: 'June 16, 10:23 am' },
  { user: 'Adam Olsen', time: 'June 11, 8:02 pm' },
  { user: 'Adam Olsen', time: 'June 11, 5:46 pm' },
  { user: 'Adam Olsen', time: 'June 11, 9:17 am' },
  { user: 'Julia Stone', time: 'June 11, 8:51 am' },
];

// Custom StepConnector with color styles
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-root': {
    borderColor: 'gray',
    '& .MuiStepConnector-line': {
      borderColor: 'gray',
      borderLeftWidth: '2px',
    },
  },
}));

const VersionHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

//   const { handleAddVersion } = useDialog();

  return (
    <Paper variant="container">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height={'auto'}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="auto"
        >
          <Typography variant="body3">{t('version')}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="auto"
        >
          <Button variant="borderButton" 
        //   onClick={(e) => {
        //     handleAddVersion('add-version', e)
        //   }}
          >
            <AddOutlined fontSize="small" />
          </Button>
          <IconButton onClick={() => navigate(AppRoutes.PROJECT_HOME)}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="auto"
        height="auto"
      >
        <Typography variant="body1">{t('autosave_version')}</Typography>
        <Switch />
      </Stack>

      <Stepper
        activeStep={1}
        orientation="vertical"
        connector={<CustomStepConnector />}
      >
        <Step>
          <StepLabel>Current version</StepLabel>
        </Step>
        <Step>
          <StepLabel>10 Versions saved</StepLabel>
          <StepContent
            sx={{
              borderLeft: '2px solid gray',
            }}
          >
            {/* Version History List */}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {versions.map((version, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{ paddingTop: 'unset', paddingBottom: 'unset' }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body3">{version.time}</Typography>
                    }
                    secondary={
                      <Stack
                        direction="row"
                        justifyContent="strech"
                        alignItems="center"
                        width="auto"
                        height="auto"
                      >
                        <Avatar>JS</Avatar>
                        <Typography variant="caption" color="textSecondary">
                          {version.user}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </StepContent>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
    </Paper>
  );
};

export { VersionHistory };
