import styles from './paper.module.css';
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material';

/* eslint-disable-next-line */
export interface PaperProps extends MuiPaperProps {
  // if needed then add extra prop
}

const Paper = (props: PaperProps) => {
  return (
    <>
      <MuiPaper {...props}>
        {props.children}
      </MuiPaper>
    </>
  );
};

export { Paper };
