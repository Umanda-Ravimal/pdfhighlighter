import styles from './alert.module.css';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

/* eslint-disable-next-line */
export interface AlertProps extends MuiAlertProps {
  // if needed then add extra prop
}

const Alert = (props: AlertProps) => {
  return (
    <>
      <MuiAlert {...props} className={styles?.alert || ''}>
        {props.children}
      </MuiAlert>
    </>
  );
};

export { Alert };
