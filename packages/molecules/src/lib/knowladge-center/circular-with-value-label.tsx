import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Paper } from '@my-workspace/packages-atoms';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Paper>
      <CircularProgress variant="determinate" {...props} />
      <Paper>
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Paper>
    </Paper>
  );
}

const CircularWithValueLabel: React.FC<{ value: number }> = ({ value }) => {
  return <CircularProgressWithLabel value={value} />;
};

export { CircularWithValueLabel };
