import styles from './stack.module.css';
import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

/* eslint-disable-next-line */
export interface StackProps extends MuiStackProps {
  // if needed then add extra prop
}

const Stack = (props: StackProps) => {
  return (
    <>
      <MuiStack {...props} className={styles?.Stack || ''}>
        {props.children}
      </MuiStack>
    </>
  );
};

export { Stack };
