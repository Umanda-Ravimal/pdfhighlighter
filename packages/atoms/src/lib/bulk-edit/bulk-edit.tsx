import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

/* eslint-disable-next-line */
// export interface MuiTextFieldProps extends TextFieldProps {
// if needed then add extra prop
// }

const BulkEdit = (props: MuiTextFieldProps) => {
  return <MuiTextField {...props} />;
};

export { BulkEdit };
