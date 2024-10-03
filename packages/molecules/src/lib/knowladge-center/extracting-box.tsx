import { Cancel } from '@mui/icons-material';
import { Paper, Typography } from '@my-workspace/packages-atoms';
import { useTranslation } from 'react-i18next';

const ExtractingBox = () => {
  const { t } = useTranslation();
  return (
    <Paper variant="extractingBox">
      <Typography variant="body2" padding={'0 6px'}>
        {t('extracting')}
      </Typography>
      <Cancel fontSize="small" sx={{ opacity: '0.7' }} />
    </Paper>
  );
};

export { ExtractingBox };
