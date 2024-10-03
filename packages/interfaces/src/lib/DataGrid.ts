import { GridValidRowModel } from '@mui/x-data-grid';

export interface DataGridVariantOverrides {}

export interface ColumnDescriptor {
  id: string;
  headerRenderer: () => React.ReactNode;
  cellRenderer: (record: any) => React.ReactNode;
}

export interface TableViewProps {
  records: Array<GridValidRowModel>;
  columns: Array<ColumnDescriptor>;
}
