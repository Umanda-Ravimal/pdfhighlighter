import styles from './input-base.module.css';
import { InputBase as MuiInputBase, InputBaseProps } from '@mui/material';

type MuiInputBaseProps = InputBaseProps & {
  // add more props for overriding
  placeholder: string;
  name: string;
};

const InputBase = (props: MuiInputBaseProps) => {
  const { name, placeholder, onChange } = props;
  return (
    <>
      <MuiInputBase
        {...props}
       
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        inputProps={{ 'aria-label': placeholder }}
        sx={{ p: '8px 12px' }}
      ></MuiInputBase>
    </>
  );
};

export { InputBase };
