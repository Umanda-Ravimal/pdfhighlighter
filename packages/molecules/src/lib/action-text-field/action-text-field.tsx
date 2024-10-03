import { AcUnit } from '@mui/icons-material';
import {
  InputAdornment,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { Button, TextField as MuiTextField } from '@my-workspace/packages-atoms';

type ActionTextFieldProps = MuiTextFieldProps & {
  // add more props for overriding
};

const ActionTextField = (props: ActionTextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <AcUnit />
          </InputAdornment>
        ),
        endAdornment: (
          <Button variant="contained" color="secondary">
            Save
          </Button>
        ),
      }}
      {...props} // apply parent props
    >
      {props.children}
    </MuiTextField>
  );
};

export { ActionTextField };
