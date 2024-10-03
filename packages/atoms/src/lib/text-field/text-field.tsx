import styles from './text-field.module.css';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

const TextField = (props: MuiTextFieldProps) => {
  return (
    <>
      <MuiTextField {...props} >
        {props.children}
      </MuiTextField>
    </>
  );
};

export { TextField };
