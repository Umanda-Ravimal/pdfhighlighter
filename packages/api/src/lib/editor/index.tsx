import { useApi } from '@my-workspace/packages-api';

const useMetadataService = () => {
  const { UPLOAD, POST } = useApi();

  interface GenerateMetaDataPayload {
    projectId: string;
    selectedBlock: string;
    selectedHeading: string;
    prompt: string;
  }

  interface CreateBlock {
    projectId: string;
    selectedBlock: string;
    selectedHeading: string;
  }

  const generateMetaData = async (prompt: string, selectedblockId: string) => {
    const projectId = '81b17a92-4a96-462c-bb3b-c44d625d374b';
    const selectedBlock = 'z768wdxx6jtynw';
    const selectedHeading = 'abstract';

    const payload: GenerateMetaDataPayload = {
      projectId,
      selectedBlock,
      selectedHeading,
      prompt,
    };

    // const response = await POST('prompt/process-text', payload);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = `Mock response for prompt: "${prompt}"`;
    return response;
  };

  const createBlock = async (selectedblockId: any) => {
    const projectId = '81b17a92-4a96-462c-bb3b-c44d625d374b';
    const selectedBlock = selectedblockId;
    const selectedHeading = 'abstract';

    const payload: CreateBlock = {
      projectId,
      selectedBlock,
      selectedHeading,
    };
    const response = await POST('prompt/fragment-info', payload);
    return response;
  };


  return {
    generateMetaData,
    createBlock,
  };
};

export { useMetadataService };
