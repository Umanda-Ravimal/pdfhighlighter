import styles from './button.module.css';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface ButtonProps extends MuiButtonProps {
  // if needed then add extra prop
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <MuiButton {...props} className={styles?.btn || ''}>
        {props.children}
      </MuiButton>
    </>
  );
};

export { Button };
