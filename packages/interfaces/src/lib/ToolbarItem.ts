export interface ToolbarItem {
  id: number | string;
  label?: string;
  icon?: React.ReactNode;
  url: string;
  renderer?: () => React.ReactNode;
}
