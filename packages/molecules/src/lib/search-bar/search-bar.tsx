import { Typography, Card, IconButton, Box, Paper } from '@my-workspace/packages-atoms';
import styles from './SearchBar.module.css';
import { InputBaseProps as MuiInputBaseProps } from '@mui/material';
import { InputBase as MuiInputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = MuiInputBaseProps & {
  placeholder: string;
  name: string;
};

const SearchBar = (props: SearchBarProps) => {
  const { name, placeholder, onChange } = props;

  return (
    <Paper>
      <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <MuiInputBase
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        inputProps={{ 'aria-label': placeholder }}
        sx={{ width: '80%' }}
      />
    </Paper>
  );
};

export { SearchBar };
