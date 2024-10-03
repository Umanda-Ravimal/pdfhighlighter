import React from "react";
import { List, ListItem, ListItemText, Menu, MenuItem, Chip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { openDialog } from "../../../commands/commands";
import { Box, IconButton, Typography } from "@kelsen-labs/atoms";
import { useTranslation } from "react-i18next";

type Props = {
  activeProjectId: string;
  projects: any[];
  onProjectOpen: (id: string) => void;
  onProjectDelete: (id: string) => (obj: { message: string }, dialog: any) => void;
  onProjectArchive: (id: string) => void;
};
export const ProjectList = ({ projects, onProjectOpen, onProjectDelete, onProjectArchive, activeProjectId }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);

  const { t } = useTranslation();

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleOpenProject = () => {
    if (!selectedProject) return;
    onProjectOpen(selectedProject.id);
    handleMenuClose();
  };
  const handleArchiveProject = ()=>{
    if (!selectedProject) return;
    console.log(selectedProject.id);
    onProjectArchive(selectedProject.id)
    handleMenuClose();
  }

  const handleDeleteProject = async () => {
    // if (!selectedProject) return;
    
    // Open the delete confirmation dialog
    openDialog(
      `https://localhost:3000/taskpane.html?page=delete-dialog`,
      {
        promptBeforeOpen: false,
        displayInIframe: true,
        width: 48,
        height: 25,
      },
      // Pass the selected project ID to the delete function upon confirmation
      onProjectDelete(selectedProject.id)
    );
    handleMenuClose();
  };

  return (
    <div>
      <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 4 }}>
        <Typography variant="h6" component="div" align="left" gutterBottom>
          {t('your_projects')}
        </Typography>
        <List>
          {projects?.map((project) =>
            activeProjectId === project.id ? (
              <ListItem key={project.id} secondaryAction={<Chip label="active" />}>
                <ListItemText primary={project.title} />
              </ListItem>
            ) : (
              <ListItem
                key={project.id}
                secondaryAction={
                  <IconButton edge="end" onClick={(event) => handleMenuClick(event, project)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={project.title} />
              </ListItem>
            )
          )}
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleOpenProject}>{t('open_project')}</MenuItem>
          <MenuItem onClick={handleArchiveProject}>{t('archive_project')}</MenuItem>
          <MenuItem onClick={handleDeleteProject}>{t('delete_project')}</MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
