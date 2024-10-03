import styles from './avatar.module.css';
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface AvatarProps extends MuiAvatarProps {
  // if needed then add extra prop
}

const Avatar = (props: AvatarProps) => {
  return (
    <>
      <MuiAvatar {...props} className={styles?.avatar|| ''}>
        {props.children}
      </MuiAvatar>
    </>
  );
};

export { Avatar };
