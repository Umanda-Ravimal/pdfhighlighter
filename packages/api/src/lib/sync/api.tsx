import { useMetaDataStore } from '@my-workspace/packages-zustand';
import React from 'react'

const GetMetadata = () => {
  const metadata = useMetaDataStore(({ metadata }) => metadata);

  console.log("Metadata In api" , metadata);
  
  const getData = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (metadata && Array.isArray(metadata) && metadata.length > 0) {
            resolve(metadata); // Resolve with metadata after the delay
          } else {
            reject('No metadata available'); // Reject if metadata is empty
          }
        }, 1000); // Simulate a delay of 1 second (1000ms)
      } catch (error) {
        reject('Error fetching metadata');
      }
    });
  };

  return {
    getData
  }
}

export {GetMetadata}
