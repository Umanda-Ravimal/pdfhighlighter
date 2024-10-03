import {
  useAuthStore,
  useSearchSourceStore,
  useSourceUrlStore,
  useLoadingStore,
  usePDFStore,
  useProjectData,
} from '@my-workspace/packages-zustand';
import { useApi } from '@my-workspace/packages-api';

interface FileData {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface BatchCreatePayload {
  files: FileData[];
  projectId: string;
}

const useSourceService = () => {
  const { UPLOAD, POST } = useApi();
  const token = useAuthStore(({ accessToken }) => accessToken);
  const getFileData = useSourceUrlStore(({ fileData }) => fileData);
  const setLoading = useLoadingStore(({ setLoading }) => setLoading);
  const setBase64Data = usePDFStore(({ setBase64Data }) => setBase64Data);
  const selectedFiles = useSearchSourceStore(({ selectedFiles }) => selectedFiles);
  const projectData = useProjectData(({ projectData }) => projectData);
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);

  // Upload source and get url
  const uploadSourceFile = async (
    file: any,
    projectId: string,
    fileId: any
  ) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      formData.append('fileId', fileId);

      const config = {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'multipart/form-data',
        },
      };
      const response = await UPLOAD('/project/source/upload', formData, config);
      return response?.data?.url;
    } catch (error) {
      throw error;
    }
  };

  // Once get url for the sources this method used for upload that sources for related project
  const createNewSources = async () => {
    setLoading(true);
    const projectId = activeProjectId;
    for (const file of getFileData) {
      try {
        if (projectId) {
          const payload: BatchCreatePayload = {
            files: [file], // Single file in an array as payload
            projectId,
          };
          const response = await POST('/project/source/batch-create', payload);
          return response?.data?.message;
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  // Define types for better clarity
  interface Query {
    text: string;
    page: number;
    pageSize: number;
  }

  // This method for fetch sources
  interface SearchPayload {
    query: Query;
    projectId: string;
  }

  // Fetch Sources
  const fetchSources = async () => {
    console.log(projectData);
    const query = {
      text: '',
      page: 1,
      pageSize: 90,
    };
    const projectId = projectData?.id;

    if (!projectId) {
      throw new Error("Project ID is missing or undefined");
    }
    try {
      
      const payload: SearchPayload = {
        query,
        projectId:projectId,
      };
      const response = await POST('/project/source/search', payload);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getEncodedPDF = async (fileUrl: string): Promise<string> => {
    try {
      const payload = {
        url: fileUrl,
      };
      const response = await POST('/project/source/file', payload);
      const responseData = response?.data?.data;

      const bufferToBase64 = (buffer: {
        type: string;
        data: number[];
      }): string => {
        const uint8Array = new Uint8Array(buffer.data);
        const binaryString = uint8Array.reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ''
        );
        return window.btoa(binaryString);
      };

      const base64Data = bufferToBase64(responseData);
      const pdfDataUrl = `data:application/pdf;base64,${base64Data}`;
      setBase64Data(pdfDataUrl);
      return pdfDataUrl;
    } catch (error) {
      console.error('Error uploading PDF URL:', error);
      throw error;
    }
  };

  const promptFragmentInfo = async () => {
    try {
      const selectedSourcesArray = Array.from(selectedFiles);
      const payload = {
        projectId: activeProjectId,
        selectedBlock: 'z768wdxx6jtynw',
        selectedHeading: 'abstract',
        update: {
          selectedSources: selectedSourcesArray,
        },
      };

      const response = await POST('/prompt/fragment-info', payload);
      console.log(response)
      // return response

    } catch (error) {}
  };
  return {
    getEncodedPDF,
    createNewSources,
    fetchSources,
    uploadSourceFile,
    promptFragmentInfo
  };
};

export { useSourceService };
