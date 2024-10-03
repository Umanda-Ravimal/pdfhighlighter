import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from '@mui/material';

/* eslint-disable-next-line */
export interface SwitchProps extends MuiSwitchProps {
  // Add additional props if needed
}

const Switch = (props: SwitchProps) => {
  return <MuiSwitch {...props} />;
};

export { Switch };
