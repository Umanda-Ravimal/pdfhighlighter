import styles from './container.module.css';
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface ContainerProps extends MuiContainerProps {
  // if needed then add extra prop
}

const Container = (props: ContainerProps) => {
  return (
    <MuiContainer {...props}>
      {props.children}
    </MuiContainer>
  );
};

export { Container };
