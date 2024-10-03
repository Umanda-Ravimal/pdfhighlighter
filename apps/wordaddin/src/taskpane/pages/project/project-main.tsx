import {  Button, Image, Link, Stack, Typography } from "@my-workspace/packages-atoms";
import { useTranslation } from "react-i18next";
import logo from "/assets/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { AppRoutes, openDialog, useDialog } from "@my-workspace/packages-common";
import { useProjectData } from "@my-workspace/packages-zustand";
import { useProjectService } from "@my-workspace/packages-api";

import {
  deleteProjectIdProperty,
  getProjectIdProperty,
  setProjectIdProperty,
} from "../../../commands/commands";

const ProjectMainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setProjects = useProjectData(({ setProjects }) => setProjects);
  const projects = useProjectData(({ projects }) => projects);
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);
  const setActiveProjectId = useProjectData(({ setActiveProjectId }) => setActiveProjectId);
  const setProjectData = useProjectData(({ setProjectData }) => setProjectData);
  const {getProjects,getProjectById} = useProjectService();
  const { handleViewSource } = useDialog();

  // const { currentOrganizations, activeOrganization, pendingOrganizations } = useActiveOrganization();

  const navigatePage = useCallback(() => {
    navigate(AppRoutes.PROJECT_CREATE);
  }, [navigate]);

  useEffect(() => {
    getAllProjects();
  }, []);

  // this is for get All Projects
  const getAllProjects = async () => {
    const data = await getProjects();
    setProjects(data.records);
  };

  useEffect(() => {
    (async () => {
      const property = await getProjectIdProperty();
      if (projects.length > 0) {
        // console.log("getProjectIdProperty", property);
        // console.log("projects", projects);
        if (property?.value) {
          const projectExists = projects.some((project) => project.id === property.value);
          if (projectExists) {
            const projectData = await getProjectById(property.value);
            setProjectData(projectData?.data);
            navigate(AppRoutes.PROJECT_HOME);
            setActiveProjectId(property.value);
            setProjectIdProperty(property.value);
          } else {
            await deleteProjectIdProperty();
          }
        }
      }
    })();
  }, [activeProjectId, projects]);

  const goBack = useCallback(() => {
    navigate(AppRoutes.PROJECT_EXIST);
  }, [navigate]);

  return (
    <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Image src={logo} alt="logo" />
      <Button variant="button1" onClick={navigatePage}>
        <Typography variant="button">{t("create_new")}</Typography>
      </Button>
      <Button variant="outlined" onClick={goBack}>
        <Typography variant="button">{t("open_existing")}</Typography>
      </Button>
      <Button variant="outlined" onClick={()=>handleViewSource(null)}>
        <Typography variant="button">PDF</Typography>
      </Button>
    </Stack>
  );
};

export { ProjectMainPage };
