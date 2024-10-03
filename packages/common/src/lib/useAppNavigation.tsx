import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@my-workspace/packages-common';

const useAppNavigation = () => {
  const navigate = useNavigate();

  // Adjust the route type to allow both AppRoutes and a string with query parameters
  const Navigate = (route: AppRoutes | `${AppRoutes}?${string}`, params?: Record<string, string>) => {
    let path = route as string;

    // If params are provided, append them to the path
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      path = `${route}?${queryString}`;
    }

    // Perform the navigation
    navigate(path);
  };

  return { Navigate };
};

export { useAppNavigation };
