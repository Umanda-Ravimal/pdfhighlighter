import React from 'react';
import { useApi } from '@my-workspace/packages-api';

const useProjectService = () => {
  const { UPLOAD, POST, GET } = useApi();

  const getProjects = async () => {
    try {
      const payload = {
        query: {
          is_archived: false,
          page: 1,
          pageSize: 9,
          text: '',
        },
      };
      const response = await POST('/project/search', payload);
      const responseData = response?.data?.data;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectTeam = async (projectId: string) => {
    try {
      const payload = {
        data: [],
      };
      const response = await GET('/project/team');
      const responseData = response;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectMetaData = async (projectId: string) => {
    try {
      const response = await GET('/project/document-metadata/' + projectId);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectById = async (projectId: string) => {
    try {
      const response = await GET('/project/by/' + projectId);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectDocument = async (projectId: string) => {
    try {
      const response = await GET('/project/document/' + projectId);
      const responseData = response;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectSource = async (projectId: string) => {
    try {
      const response = await GET('/project/source/' + projectId);
      const responseData = response;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const getProjectfragmentinfo = async (projectId: string) => {
    try {
      const payload = {
        projectId: projectId,
        selectedBlock: 'z768wdxx6jtynw',
        selectedHeading: 'abstract',
      };
      const response = await POST('/prompt/fragment-info', payload);
      const responseData = response;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const createProject = async (projectName: string) => {
    try {
      const payload = {
        description: projectName,
        team: [],
        title: projectName,
      };
      const response = await POST('/project/create', payload);
      const responseData = response?.data?.message;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const projectArchive = async (projectId: string) => {
    try {
      const payload = {
        projectId: projectId,
        status: true,
      };
      const response = await POST('/project/toggle-archive', payload);
      const responseData = response?.data?.message;
      return responseData;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  return {
    getProjects,
    createProject,
    projectArchive,
    getProjectMetaData,
    getProjectById,
    getProjectDocument,
    getProjectSource,
    getProjectfragmentinfo,
  };
};

export { useProjectService };
