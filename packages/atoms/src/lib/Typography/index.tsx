import styles from './typography.module.css';
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface TypographyProps extends MuiTypographyProps {
  // if needed then add extra prop
}

const Typography = (props: TypographyProps) => {
  return (
    <>
      <MuiTypography {...props}>
        {props.children}
      </MuiTypography>
    </>
  );
};

export { Typography };
