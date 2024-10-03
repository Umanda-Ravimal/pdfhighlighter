import styles from './card.module.css';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

/* eslint-disable-next-line */
export interface CardProps extends MuiCardProps {
  // if needed then add extra prop
}

const Card = (props: CardProps) => {
  return (
    <>
      <MuiCard {...props} >
        {props.children}
      </MuiCard>
    </>
  );
};

export { Card };
