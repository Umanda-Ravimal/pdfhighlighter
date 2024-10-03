import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@my-workspace/packages-atoms';

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: '80%' }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};

export { LoadingSkeleton };
