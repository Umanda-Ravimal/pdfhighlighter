import React, { ElementType, useMemo } from 'react';
import { Box, BoxProps, SxProps, Theme, useTheme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { StyledBoxVariantOverrides } from '@my-workspace/packages-interfaces';

declare module '@mui/material/styles' {
  interface Theme {
    styledBox: { [key: string]: React.CSSProperties };
  }

  interface ThemeOptions {
    styledBox?: { [key: string]: React.CSSProperties };
  }
}

type StyledBoxProps<C extends ElementType = 'div'> = Omit<
  BoxProps<C>,
  'variant' | 'sx'
> & {
  variant: OverridableStringUnion<
    'primary' | 'secondary',
    StyledBoxVariantOverrides
  >;
  sx?: SxProps<Theme>;
  component?: C;
  innerRef?: React.Ref<any>;
};

const StyledBox = <C extends React.ElementType = 'div'>(
  props: StyledBoxProps<C> & { component?: C }
) => {
  const { variant, sx: sxProp, innerRef, ...otherProps } = props;
  const theme = useTheme();

  // Determine variant styles
  const variantStyles: SxProps<Theme> = useMemo(() => {
    if (variant && theme.styledBox && theme.styledBox[variant]) {
      return theme.styledBox[variant] as SxProps<Theme>;
    }
    return {};
  }, [variant, theme.styledBox]);

  const sx: SxProps<Theme> = useMemo(
    () => ({
      ...sxProp,
      ...variantStyles,
    }),
    [sxProp, variantStyles]
  );

  return (
    <Box
      component={otherProps.component as C}
      ref={innerRef}
      sx={sx}
      {...otherProps}
    />
  );
};

StyledBox.displayName = 'StyledBox';
export { StyledBox };
