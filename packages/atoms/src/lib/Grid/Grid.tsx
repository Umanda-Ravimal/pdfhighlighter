import styles from './grid.module.css';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

/* eslint-disable-next-line */
export interface GridProps extends MuiGridProps {
  // if needed then add extra prop
}

const Grid = (props: GridProps) => {
  return (
    <>
      <MuiGrid {...props} >
        {props.children}
      </MuiGrid>
    </>
  );
};

export { Grid };
