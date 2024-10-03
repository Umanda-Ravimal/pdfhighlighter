import { JSON_PLACEHOLDER_ENDPOINTS } from './endpoints';
import axios from 'axios';

export const getUsers = async (): Promise<any> => {
  const { USERS } = JSON_PLACEHOLDER_ENDPOINTS;

  try {
    const response = await axios.get(USERS);
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data?.errors);
  }
};
