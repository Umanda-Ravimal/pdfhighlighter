import { Box, Paper, Stack, Image, IconButton } from "@kelsen-labs/atoms";
import React from "react";
import logo from "/assets/logo.png";
import { useProjectService } from "@kelsen-labs/api";
import { useProjectData } from "@kelsen-labs/zustand";
import { AppRoutes, openDialog } from "@kelsen-labs/common";
import { CreateProject } from "../../components";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  const { createProject } = useProjectService();
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);

  const handleProjectCreate = async ({ projectName }: { projectName: string }) => {
    console.log(projectName);
    if (activeProjectId != null) {
      openDialog(
        `https://localhost:3000/taskpane.html?page=exist-dialog`,
        {
          promptBeforeOpen: false,
          displayInIframe: true,
          width: 48,
          height: 25,
        },
        async (recieved: { message: string }, dialog: any) => {
          dialog.close();
          if (recieved.message === "open") {
            const createdProject = await createProject(projectName);
            navigate(AppRoutes.PROJECT_EXIST);
            console.log(createdProject);
          }
        }
      );
    } else {
      const createdProject = await createProject(projectName);
      navigate(AppRoutes.PROJECT_EXIST);
      console.log(createdProject);
    }
    // setProjectIdProperty(createdProject.id);
    // setActiveProjectId(createdProject.id);
  };

  const handleBackClick = () => {
    navigate(AppRoutes.PROJECT_MAIN);
  };

  return (
    <Stack height="auto" justifyContent="center" alignItems="center">
      <Stack direction="row" justifyContent="space-between" alignItems="center" height={"auto"}>
        <IconButton onClick={handleBackClick}>
          <ArrowBack fontSize="small" />
        </IconButton>
      </Stack>
      <Image src={logo} alt="logo" />
      <Paper variant="container" sx={{ height: "auto" }}>
        <CreateProject onCreateProject={handleProjectCreate} />
      </Paper>
    </Stack>
  );
};

export { NewProject };
