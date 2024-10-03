// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Button} from "@my-workspace/packages-atoms";
// import {useProjectService} from '@my-workspace/api'

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { ViewSource } from '../../../apps/my-workspace/src/app/view-source';

export function App() {
  const [projects, setProjects] = useState('');
  // const { getProjects } = useProjectService();

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = async () => {
    // const data = await getProjects();
    // setProjects(data);
  };

  return (
    <div>
      <h6>{projects}</h6>
      <Button>Click Me</Button>
      <ViewSource />
    </div>
  );
}

export default App;
