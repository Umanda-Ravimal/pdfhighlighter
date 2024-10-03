import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@my-workspace/packages-zustand';
import { APP_SERVER_URL } from './config';

// Create an axios instance with a default or initial baseURL
let api = axios.create({
  baseURL: '',
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const addToken = (token: string) => {
  api.defaults.headers.common['x-auth-token'] = token;
};

const removeToken = () => {
  delete api.defaults.headers.common['x-auth-token'];
};

const setAuthToken = (token: string) => {
  if (token) return addToken(token);
  return removeToken();
};

const useApi = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const authToken ="eyJraWQiOiJvMXFhN0k5UFFpaHRLMVVZYjBCSGV6TFdLQm5VOVJZdHl1U3ZHRmVhYUlZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjY2VkNDUxOC04MDExLTcwMmQtYTk4MC01MWU4NGQ3ZDJlMzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2NhLWNlbnRyYWwtMV9rZWFBeHZITDgiLCJjbGllbnRfaWQiOiIxbm00cGY3MjdkdTlqY3ZqN281OXA0bjJqbiIsIm9yaWdpbl9qdGkiOiJiMzI3NDA3MS0xMzVkLTQwM2UtYmQ3Zi0wM2Y3N2UwYTIwN2UiLCJldmVudF9pZCI6IjQ5NDQ3NmZmLTdkZTctNGJhYy1hYWI3LTMyMzE3MWU0MGE5OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3Mjc0NDg2MDgsImV4cCI6MTcyNzQ1MjIwOCwiaWF0IjoxNzI3NDQ4NjA4LCJqdGkiOiI5YjIxYTFhNi00NGUwLTRiNWUtODNjNy04YTc5YmFmODI1MzciLCJ1c2VybmFtZSI6InRpcmFuMTAifQ.eMmdAYokLTD6DyejhzNtH4vBoYmPjL3BAt7auUJ_1VMwBbR-My_K2TBSB6asuRVLjuBm6UTOo7dApKkbkQvNNFPPl83mxVZU_Jiwm0808JO0pFvsCA-95CigVv_HEPR5zz7l8fasFdh7ENBFP8xiOyclQzklt_1xdu4zc7lhuEnswijZtppeXutZdGj9B6m8BTM1eXeBRzNxhMK8g2q7EOyyYSuHGr76beWrqvcsTciC2RVFm7fmMI5deZC5JqCsdoutjwX8-aW5t-CB7jTj0Dp00fb0i0PAgYt82R_xzeyCEvRPeFKnFM99vI77E48dHS0GBi5Hbhqd2jEQVzerOg"
  const SERVER_URL = APP_SERVER_URL;

  useEffect(() => {
    api.defaults.baseURL = SERVER_URL;
  }, [SERVER_URL]);

  // Set auth token whenever it changes
  useEffect(() => {
    if (authToken) {
      setAuthToken(authToken);
    }
  }, [authToken]);

  const GET = async (route: string) => {
    return await api.get(route);
  };

  const DELETE = async (route: string) => {
    return await api.delete(route);
  };

  const POST = async (route: string, data: any) => {
    return await api.post(route, data);
  };

  const PUT = async (route: string, data: any) => {
    return await api.put(route, data);
  };

  const PATCH = async (route: string, data: any) => {
    return await api.patch(route, data);
  };

  const UPLOAD = async (route: string, data: any, config: any) => {
    return await api.post(route, data, config);
  };

  return {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD,
    PATCH,
  };
};

export { useApi };
