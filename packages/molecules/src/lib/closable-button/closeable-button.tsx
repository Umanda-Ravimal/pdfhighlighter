import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CloseableButtonProps {
  icon: React.ReactNode;
  label: string;
  url: string;
  active: boolean;
  onClose?: () => void;
  sx?: SxProps;
  iconSx?: SxProps;
}

const CloseableButton = (props: CloseableButtonProps) => {
  // const navigate = useNavigate();

  // const handleClick = useCallback(() => {
  //   navigate(props.url);
  // }, [navigate, props.url]);

  const handleClose = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <Button
      sx={{
        bgcolor: grey[100],
        '&:hover': {
          bgcolor: grey[100],
        },
        ...props.sx,
      }}
      variant="outlined"
      disableRipple
      startIcon={props.icon}
      style={{
        position: 'relative',
        border: '1p',
        color: 'black',
        borderColor: props.active ? 'blue' : '',
      }}
      // onClick={handleClick}
    >
      {props.label}
      {props.onClose && (
        <CloseIcon
          fontSize="small"
          sx={{
            position: 'absolute',
            top: -11,
            right: -6,
            color: 'blue',
            bgcolor: grey[100],
            borderRadius: '50%',
            ...props.iconSx,
          }}
          onClick={handleClose}
        />
      )}
    </Button>
  );
};

export { CloseableButton };
