// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { useProjectService } from '@my-workspace/packages-api';
import {
  Button,
  Alert,
  Avatar,
  Badge,
  Box,
  BulkEdit,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@my-workspace/packages-atoms';
import {
  ActionTextField,
  CloseableButton,
  LoadingSkeleton,
  SearchBar,
  UserCard,
} from '@my-workspace/packages-molecules';
import {
  UserList,
  EditorToolbar,
  SignInForm,
  SignUpForm,
  VerifyAccountForm,
  UploadSourcePage,
  ImportPage,
} from '@my-workspace/packages-organisms';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { ViewSource } from './view-source';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';

export function App() {
  const [projects, setProjects] = useState('');
  const { getProjects } = useProjectService();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getProjectData();
  }, []);

  // Example user data
  const userData = {
    name: 'John Doe',
    userName: 'johndoe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    profileUrl: 'https://example.com/path/to/profile.jpg', // Replace with actual URL
  };

  const toolbarItems = [
    {
      id: '1',
      label: 'Item 1',
      icon: null, // Replace with actual icon component
      url: '/item-1',
      renderer: () => <div>Item 1 Renderer</div>,
    },
    {
      id: '2',
      label: 'Item 2',
      icon: null, // Replace with actual icon component
      url: '/item-2',
      renderer: () => <div>Item 2 Renderer</div>,
    },
    // Add more toolbar items as needed
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const getProjectData = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleDragEnd = () => {
    console.log('Items reordered:');
  };

  const signUpUrl = '/sign-up';
  const forgotPasswordUrl = '/forgot-password';
  const logoUrl = '/path-to-logo.png';

  const handleSignIn = () => {};

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Attoms</h1>
        <Button>Click Me</Button>
        <Alert>Welcome</Alert>
        <Avatar />
        <Badge>Hello</Badge>
        <Box>Box</Box>
        <BulkEdit>Bulk</BulkEdit>
        <Card>
          <CardContent>Card Content</CardContent>
        </Card>
        <Container>Container</Container>
        <Grid>Grid</Grid>
        <Paper>Paper</Paper>
        <Stack>Stack</Stack>
        <Switch />
        <TextField />
        <Typography>Typography</Typography>

        <h1>Molecules</h1>
        <SearchBar
          name="search"
          placeholder="Search..."
          onChange={handleSearchChange} // Pass the onChange handler
        />
        <LoadingSkeleton></LoadingSkeleton>
        <ActionTextField></ActionTextField>
        <UserCard
          name={userData.name}
          userName={userData.userName}
          email={userData.email}
          phoneNumber={userData.phoneNumber}
          profileUrl={userData.profileUrl}
        />

        <h1>Organism</h1>
        <UserList></UserList>
        <EditorToolbar items={toolbarItems} handleDragEnd={handleDragEnd} />
        <SignInForm
          onSubmit={handleSignIn}
          signUpUrl={signUpUrl}
          forgotPasswordUrl={forgotPasswordUrl}
          logo={logoUrl}
        ></SignInForm>

        <SignUpForm
          onSubmit={handleSignIn}
          signInUrl={signUpUrl}
          logo={logoUrl}
        />
        <VerifyAccountForm
          onSubmit={handleSignIn}
          onResendClick={handleSignIn}
          logo={logoUrl}
        ></VerifyAccountForm>

        <UploadSourcePage></UploadSourcePage>
        {/* <ImportPage></ImportPage> */}
        <ViewSource />
      </div>
    </ThemeProvider>
  );
}

export default App;
