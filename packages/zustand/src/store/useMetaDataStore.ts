import { create } from 'zustand';

interface State {
  inputValue: string;
  responceData: {
    inputValue: string;
    response: string;
    key: string;
    blockId: string;
    applyed: boolean;
    favorite: boolean;
  }[];
  filteredMetaData: {
    inputValue: string;
    response: string;
    key: string;
    applyed: boolean;
    favorite: boolean;
  }[];
  metadata: {
    response: string;
    key: string;
    linked: boolean;
    selected: boolean;
    blockId: string | null;
  }[];
  newParaId: string | null;
  blockId: string | null;
  selectedblockId: string | null;
  blocks: Record<string, Record<string, string[]>>;
  matchedResponses: Array<{
    filteredResponse: string;
    processedResponse: string;
    paragraphId : string;
    blockId: string;
  }>;
}

interface MetaData {
  inputValue: string;
  response: string;
  key: string;
  applyed: boolean;
  favorite: boolean;
}

interface Action {
  setInputValue: (value: string) => void;
  // addParagraphsToBlock: (
  //   blockId: string,
  //   responseMetadataKey: string,
  //   paragraphIds: string[]
  // ) => void;
  addResponceData: (
    inputValue: string,
    response: string,
    key: string,
    blockId: string
  ) => void;
  updateResponseData: (key: string, newResponse: string) => void;
  addMetadata: (
    response: string,
    key: string,
    linked: boolean,
    blockId: string | null
  ) => void;
  setAppliedStatus: (key: string) => void;
  updateSavedResponse: (key: string, updatedResponse: string) => void;
  updateMatchedResponse: (key: string, updatedResponse: string) => void;
  updateFavoriteStatus: (key: string, favorite: boolean) => void;
  // setFilteredMetaData: (filteredData: MetaData[]) => void;
  updateLinkedStatus: (key: string, linked: boolean) => void;
  updateSelectedStatus: (matchingKey: string) => void;
  deleteSavedResponse: (key: string) => void;
  deleteMetadataByBlockId: (blockId: string) => void;
  deleteMatchedResponsesByBlockId: (blockId: string) => void;
  setblockId: (id: string | null) => void;
  setSelectedBlockId: (id: string | null) => void;
  setNewParaId: (id: string | null) => void;
  setMatchedResponses: (newResponse: {
    filteredResponse: string;
    processedResponse: string;
    paragraphId  :string;
    blockId: string;
  }) => void;
  setMatchedResponsesArray: (
    updatedArray: {
      filteredResponse: string;
      processedResponse: string;
      paragraphId : string;
      blockId: string;
    }[]
  ) => void;
}

const useMetaDataStore = create<State & Action>((set) => ({
  inputValue: '',
  responceData: JSON.parse(localStorage.getItem('responceData') || '[]'),
  metadata: JSON.parse(localStorage.getItem('updatedmetadata') || '[]'),
  newParaId: null,
  blockId: 'block1',
  selectedblockId: 'block1',
  filteredMetaData: [],
  blocks: {},
  matchedResponses: JSON.parse(localStorage.getItem('matchedData') || '[]'),

  setInputValue: (value) => set({ inputValue: value }),

  // Add prompt input data , key , and applyed and also empty responce
  addResponceData: (inputValue, response, key, blockId) =>
    set((state) => ({
      responceData: [
        ...state.responceData,
        { inputValue, response, key, blockId, applyed: false, favorite: false },
      ],
    })),

  // Update History data
  updateResponseData: (key, newResponse) =>
    set((state) => {
      const updatedresponceData = state.responceData.map((item) =>
        item.key === key ? { ...item, response: newResponse } : item
      );
      localStorage.setItem('responceData', JSON.stringify(updatedresponceData));
      return {
        responceData: updatedresponceData,
      };
    }),

  setAppliedStatus: (key) =>
    set((state) => {
      const updatedMetaData = state.responceData.map((item) =>
        item.key === key ? { ...item, applyed: true } : item
      );
      // localStorage.setItem('responceData', JSON.stringify(updatedMetaData));
      return {
        responceData: updatedMetaData,
      };
    }),

  // addMetadata: (response, key, linked, blockId) =>
  //   set((state) => {
  //     const updatedMetadata = [
  //       ...state.metadata,
  //       { response, key, linked, selected: false, blockId },
  //     ];
  //     localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata)); // Save to localStorage
  //     return { metadata: updatedMetadata };
  //   }),

    addMetadata: (response, key, linked, blockId) =>
      set((state) => {
        // Check if an entry with the same key already exists
        const isDuplicate = state.metadata.some((item) => item.key === key);
    
        if (isDuplicate) {
          console.log(`Duplicate key detected: ${key}`);
          return { metadata: state.metadata }; // Return the current state without adding the duplicate
        }
    
        const updatedMetadata = [
          ...state.metadata,
          { response, key, linked, selected: false, blockId },
        ];
    
        localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata)); // Save to localStorage
        return { metadata: updatedMetadata };
      }),

      updateSavedResponse: (key, updatedResponse) =>
        set((state) => {
          // Filter out any duplicate items with the same key
          const filteredMetadata = state.metadata.filter((item) => item.key !== key);
      
          // Find the current item to ensure required fields are copied
          const currentItem = state.metadata.find((item) => item.key === key);
      
          // Add the updated response with all necessary fields
          const updatedMetadata = [
            ...filteredMetadata,
            {
              ...currentItem,
              key,
              response: updatedResponse,
              // Ensure that all required fields are present
              linked: currentItem?.linked ?? false,
              selected: currentItem?.selected ?? false,
              blockId: currentItem?.blockId ?? null,
            }
          ];
      
          // Save to localStorage
          localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata));
          
          return { metadata: updatedMetadata };
        }),

    updateMatchedResponse: (key, updatedResponse) =>
      set((state) => {
        const updatedMatchedResponses = state.matchedResponses.map((item) =>
          item.paragraphId === key ? { ...item, filteredResponse: updatedResponse } : item
        );
        localStorage.setItem('matchedData', JSON.stringify(updatedMatchedResponses));
        return { matchedResponses: updatedMatchedResponses };
      }),

  updateFavoriteStatus: (key, favorite) =>
    set((state) => {
      const updatedMetaData = state.responceData.map((item) =>
        item.key === key ? { ...item, favorite: favorite } : item
      );
      localStorage.setItem('responceData', JSON.stringify(updatedMetaData));
      return {
        responceData: updatedMetaData,
      };
    }),

  updateLinkedStatus: (key, linked) =>
    set((state) => {
      const updatedMetadata = state.metadata.map((item) =>
        item.key === key ? { ...item, linked } : item
      );
      localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata)); // Save to localStorage
      return { metadata: updatedMetadata };
    }),

  updateSelectedStatus: (matchingKey: string) =>
    set((state) => {
      const updatedMetadata = state.metadata.map((item) =>
        item.key === matchingKey
          ? { ...item, selected: true }
          : { ...item, selected: false }
      );
      localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata)); // Save to localStorage
      return { metadata: updatedMetadata };
    }),

  deleteSavedResponse: (key: string) =>
    set((state) => {
      const updatedMetadata = state.metadata.filter((item) => item.key !== key);
      localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata)); // Save to localStorage
      return { metadata: updatedMetadata };
    }),

     // Action to delete metadata by blockId
  deleteMetadataByBlockId: (blockId: string) =>
    set((state) => {
      const updatedMetadata = state.metadata.filter(
        (item) => item.blockId !== blockId
      );
      localStorage.setItem('updatedmetadata', JSON.stringify(updatedMetadata));
      return { metadata: updatedMetadata };
    }),

  setNewParaId: (id) => set({ newParaId: id }),
  setblockId: (id) => set({ blockId: id }),
  setSelectedBlockId: (id) => set({ selectedblockId: id }),

  // setFilteredMetaData: (filteredData) =>
  //   set({ filteredMetaData: filteredData }),

  // addParagraphsToBlock: (blockId, responseMetadataKey, paragraphIds) => {
  //   set((state) => {
  //     const existingBlock = state.blocks[blockId] || {};
  //     const updatedMetadata = {
  //       ...existingBlock,
  //       [responseMetadataKey]: [
  //         ...(existingBlock[responseMetadataKey] || []),
  //         ...paragraphIds,
  //       ],
  //     };
  //     return {
  //       blocks: {
  //         ...state.blocks,
  //         [blockId]: updatedMetadata,
  //       },
  //     };
  //   });
  // },

  setMatchedResponses: (newResponse) =>
    set((state) => {
      // Filter out any existing items with the same paragraphId and processedResponse: null
      const filteredMatchedResponses = state.matchedResponses.filter(
        (item) =>
          !(
            item.paragraphId === newResponse.paragraphId &&
            item.processedResponse === null
          )
      );
      localStorage.setItem('matchedData', JSON.stringify(filteredMatchedResponses));
      return {
        matchedResponses: [...filteredMatchedResponses, newResponse],
      };
    }),

    deleteMatchedResponsesByBlockId: (blockId: string) =>
      set((state) => {
        const updatedMatchedResponses = state.matchedResponses.filter(
          (item) => item.blockId !== blockId
        );
        localStorage.setItem('matchedData', JSON.stringify(updatedMatchedResponses));
        return { matchedResponses: updatedMatchedResponses };
      }),

  setMatchedResponsesArray: (updatedArray) =>
    set({ matchedResponses: updatedArray }),
}));

export { useMetaDataStore };
