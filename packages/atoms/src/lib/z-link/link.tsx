import styles from './link.module.css';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

/* eslint-disable-next-line */
export interface LinkProps extends MuiLinkProps {
  // if needed then add extra prop
}

const Link = (props: LinkProps) => {
  return (
    <MuiLink {...props}>
      {props.children}
    </MuiLink>
  );
};

export { Link };
