// buttonModel.ts
import { AppRoutes } from '@my-workspace/packages-common';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditorIcon from '@mui/icons-material/NoteAddOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import ReferencesIcon from '@mui/icons-material/ClassOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

export const buttonModel: {
    type: string;
    url: `${AppRoutes}?view=${string}`; // Define the url type correctly
    icon: React.ElementType;
  }[] = [
    {
      type: 'upload',
      url: `${AppRoutes.PROJECT_HOME}?view=upload`,
      icon: FormatListBulletedIcon,
    },
    {
      type: 'create',
      url: `${AppRoutes.PROJECT_HOME}?view=create`,
      icon: EditorIcon,
    },
    {
      type: 'folder',
      url: `${AppRoutes.PROJECT_HOME}?view=folder`,
      icon: FolderIcon,
    },
    {
      type: 'references',
      url: `${AppRoutes.PROJECT_HOME}?view=references`,
      icon: ReferencesIcon,
    },
    {
      type: 'settings',
      url: `${AppRoutes.PROJECT_HOME}?view=settings`,
      icon: SettingsIcon,
    },
  ];