import { Box, Paper, Stack, Image, IconButton } from "@my-workspace/packages-atoms";
import React, { useEffect } from "react";
import logo from "/assets/logo.png";
import { useProjectService } from "@my-workspace/packages-api";
import { useProjectData } from "@my-workspace/packages-zustand";
import { AppRoutes } from "@my-workspace/packages-common";
import { useNavigate } from "react-router-dom";
import { loadFromBase64, setProjectIdProperty } from "../../../commands/commands";
import useProjects from "../../../hook/use-projects";
// import { ProjectList } from "../../components";
import { ArrowBack } from "@mui/icons-material";

const ExistProject = () => {
  const navigate = useNavigate();
  const { getProject } = useProjects("");
  const {
    getProjects,
    projectArchive,
    getProjectMetaData,
    getProjectById,
    getProjectDocument,
    getProjectSource,
    getProjectfragmentinfo,
  } = useProjectService();
  const projects = useProjectData(({ projects }) => projects);
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);
  const setActiveProjectId = useProjectData(({ setActiveProjectId }) => setActiveProjectId);
  const setProjectData = useProjectData(({ setProjectData }) => setProjectData);
  const setProjects = useProjectData(({ setProjects }) => setProjects);

  useEffect(() => {
    getAllProjects();
  }, []);

  // this is for get All Projects
  const getAllProjects = async () => {
    const data = await getProjects();
    setProjects(data.records);
  };

  const handleProjectOpen = async (projectId: string) => {
    console.log("projectId", projectId);
    const metaData = await getProjectMetaData(projectId);
    console.log("metaData", metaData);
    const projectData = await getProjectById(projectId);
    console.log("projectData", projectData);
    setProjectData(projectData?.data);
    const projectDocument = await getProjectDocument(projectId);
    console.log("projectDocument", projectDocument.data);
    const projectSource = await getProjectSource(projectId);
    console.log("projectSource", projectSource);
    const projectInfo = await getProjectfragmentinfo(projectId);
    console.log("projectInfo", projectInfo);
    handleOpenExistingProject(projectId);

    navigate(AppRoutes.PROJECT_HOME);
    setActiveProjectId(projectId);
    setProjectIdProperty(projectId);
    const project = getProject(projectId);
    await loadFromBase64(project.document as string);
  };

  const handleOpenExistingProject = (projectId: string) => async (recieved: { message: string }, dialog: any) => {
    dialog.close();
    if (recieved.message === "open") {
      if (!projectId) return;
      const project = getProject(projectId);
      setProjectIdProperty(projectId);
      setActiveProjectId(projectId);
      await loadFromBase64(project.document as string);
      // Set the Project ID property and mark the project as active.
    }
  };

  // This method for delete Project
  // const handleProjectDelete =
  //   (projectId: string) =>
  //   async ({ message }, dialog) => {
  //     console.log(projectId);
  //     dialog.close();
  //     if (message === "confirm") {
  //       // deleteProject(projectId);
  //       projectArchive(projectId);

  //       if (activeProjectId === projectId) {
  //         // await clearDocument();
  //         // await deleteProjectIdProperty();
  //         setProjectIdProperty(null);
  //       }
  //     }
  //   };

  // this project for Archive Project
  const handleProjectArchive = async (projectId: string) => {
    console.log(projectId);
    const projectArchiveMessage = await projectArchive(projectId);
    console.log(projectArchiveMessage);
    if (projectArchiveMessage === "Status toggled successfully") {
      getAllProjects();
    }
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
      <Paper variant="container">
        {/* <ProjectList
          activeProjectId={activeProjectId}
          projects={projects}
          onProjectOpen={handleProjectOpen}
          onProjectDelete={handleProjectDelete}
          onProjectArchive={handleProjectArchive}
        /> */}
      </Paper>
    </Stack>
  );
};

export { ExistProject };
