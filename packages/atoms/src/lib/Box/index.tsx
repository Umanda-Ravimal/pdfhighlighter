import styles from './box.module.css';
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

/* eslint-disable-next-line */
export interface BoxProps extends MuiBoxProps {
  // if needed then add extra prop
}

const Box = (props: BoxProps) => {
  return (
    <>
      <MuiBox {...props}>
        {props.children}
      </MuiBox>
    </>
  );
};

export { Box };
