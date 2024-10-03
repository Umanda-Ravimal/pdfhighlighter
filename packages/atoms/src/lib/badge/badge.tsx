import styles from './badge.module.css';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

/* eslint-disable-next-line */
export interface BadgeProps extends MuiBadgeProps {
  // if needed then add extra prop
}

const Badge = (props: BadgeProps) => {
  return (
    <>
      <MuiBadge {...props}>
        {props.children}
      </MuiBadge>
    </>
  );
};

export { Badge };
