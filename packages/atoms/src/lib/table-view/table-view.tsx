import { useMemo } from 'react';
import { Box, BoxProps, SxProps, Theme, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { OverridableStringUnion } from '@mui/types';

import {
  TableViewProps,
  DataGridVariantOverrides,
} from '@my-workspace/packages-interfaces';

declare module '@mui/material/styles' {
  interface Theme {
    tableView?: {
      [key: string]:
        | React.CSSProperties
        | { [key: string]: React.CSSProperties };
    };
  }

  interface ThemeOptions {
    tableView?: {
      [key: string]:
        | React.CSSProperties
        | { [key: string]: React.CSSProperties };
    };
  }
}

type TableProps = TableViewProps & {
  variant: OverridableStringUnion<
    'primary' | 'secondary',
    DataGridVariantOverrides
  >;
  sx?: SxProps<Theme>;
  innerRef?: React.Ref<any>;
};

const TableView = ({
  records,
  columns,
  variant,
  sx: sxProp,
  ...rest
}: TableProps) => {
  const theme = useTheme();

  const columnsDef: GridColDef[] = columns.map((column) => ({
    ...column,
    field: column.id,
    renderHeader: column.headerRenderer,
    renderCell: column.cellRenderer,
    flex: 1,
    sortable: false,
    editable: true,
  }));

  // Determine variant styles
  const variantStyles: SxProps<Theme> = useMemo(() => {
    if (variant && theme.tableView && theme.tableView[variant]) {
      return theme.tableView[variant] as SxProps<Theme>;
    }
    return {};
  }, [variant, theme.tableView]);

  const sx: SxProps<Theme> = useMemo(
    () => ({
      ...sxProp,
      ...variantStyles,
    }),
    [sxProp, variantStyles]
  );

  return (
    <DataGrid
      sx={sx}
      autoHeight
      hideFooter
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      columns={columnsDef}
      rows={records}
      {...rest}
    />
  );
};

export { TableView };
