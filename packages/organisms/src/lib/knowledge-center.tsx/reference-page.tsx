import {
  Paper,
  Container,
  Stack,
  Typography,
  Switch,
  Avatar,
} from '@my-workspace/packages-atoms';
import React from 'react';
import { useTranslation } from 'react-i18next';
import referenceData from '../../../../api/src/lib/sources/referenceData.json';

const ReferencePage = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center" height={'auto'}>
        <Typography variant="header">{t('references')}</Typography>
        <Avatar>k</Avatar>
        <Typography variant="h6">{t('by_app')}</Typography>
      </Stack>
      <Paper variant="sourceBox">
        <Container>
          <Stack direction="column" height={'auto'} gap="0px">
            {referenceData.map((reference, index) => (
              <Stack key={index} direction="row" alignItems="center">
                <Typography
                  variant="body2"
                  sx={{
                    border: '1px solid grey',
                    backgroundColor: '#D1D1D1',
                    width: '18px',
                    padding: 'var(--none, 0px) 2px',
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="blueText">{reference.title}</Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Paper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="auto"
        height="auto"
      >
        <Typography variant="body1">{t('show_reference')}</Typography>
        <Switch />
      </Stack>
    </Stack>
  );
};

export { ReferencePage };
