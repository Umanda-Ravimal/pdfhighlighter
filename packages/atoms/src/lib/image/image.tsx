import React from 'react';
import {
  ImageList as MuiImageList,
  ImageListItem as MuiImageListItem,
} from '@mui/material';

type MuiImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export interface ImageProps extends MuiImageProps {
  // if needed then add extra prop
}

const Image = (props: ImageProps) => {
  return (
    <MuiImageList {...props} cols={1}>
      <MuiImageListItem>
        <img src={props.src} alt={props.alt} />
      </MuiImageListItem>
    </MuiImageList>
  );
};

export { Image };
