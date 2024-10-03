import styles from './icon-button.module.css';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface IconButtonProps extends MuiIconButtonProps {
  // if needed then add extra prop
}

const IconButton = (props: IconButtonProps) => {
  return (
    <>
      <MuiIconButton {...props}>
        {props.children}
      </MuiIconButton>
    </>
  );
};

export { IconButton };
