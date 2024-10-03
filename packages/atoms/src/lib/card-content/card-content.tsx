import styles from './card-content.module.css';
import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface CardContentProps extends MuiCardContentProps {
  // if needed then add extra prop
}

const CardContent = (props: CardContentProps) => {
  return (
    <>
      <MuiCardContent {...props}>
        {props.children}
      </MuiCardContent>
    </>
  );
};

export { CardContent };
