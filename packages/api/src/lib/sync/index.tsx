import { useMetaDataStore } from '@my-workspace/packages-zustand';
import { GetMetadata } from './api';


const useSyncService = () => {
  const {getData} = GetMetadata();

  const useMetadata = async (blockId : string): Promise<any> => {
    try {
      const data = await getData();
      console.log(data);
      if (data) {
        return data;
      }
      
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  };

  return {
    useMetadata,
  };
};

export { useSyncService };
