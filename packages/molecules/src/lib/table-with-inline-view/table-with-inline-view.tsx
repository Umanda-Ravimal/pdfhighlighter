/* eslint-disable react/jsx-no-useless-fragment */
import { GridValidRowModel } from '@mui/x-data-grid';
import { Box, BulkEdit, TableView } from '@my-workspace/packages-atoms';
import { ColumnDescriptor } from '@my-workspace/packages-interfaces';

interface TableWithInlineViewProps {
  mode?: 'bulk-edit' | 'key-value-edit';
  records: Array<GridValidRowModel>;
  columns?: Array<ColumnDescriptor>;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  defaultValue?: string;
}

declare module '@my-workspace/packages-interfaces' {
  interface DataGridVariantOverrides {
    grayRow: true;
  }
}

const TableWithInlineView = ({
  mode = 'bulk-edit',
  multiline = true,
  rows = 5,
  records,
  fullWidth = true,
  defaultValue = '',
  columns = [],
}: TableWithInlineViewProps) => {
  return (
    <>
      {mode === 'bulk-edit' ? (
        <TableView records={records} columns={columns} variant="grayRow" />
      ) : (
        <BulkEdit
          multiline={multiline}
          fullWidth={fullWidth}
          rows={rows}
          defaultValue={defaultValue}
        />
      )}
    </>
  );
};

export { TableWithInlineView };
