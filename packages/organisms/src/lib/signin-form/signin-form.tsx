import {
  Button,
  Card,
  StyledBox,
  FormTextInput,
  Typography,
  Container,
  Stack,
  Link,
} from '@my-workspace/packages-atoms';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = { username: string; password: string };

type SignInFormProps = {
  onSubmit: (data: FormData) => void;
  signUpUrl: string;
  forgotPasswordUrl: string;
  logo: string;
};

const signInSchema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export default function SignIn(props: SignInFormProps) {
  const { onSubmit, signUpUrl, logo } = props;
  const methods = useForm({
    resolver: yupResolver(signInSchema),
  });
  const onSubmitWrapper = async (data: FormData) => {
    methods.clearErrors();
    try {
      await onSubmit(data);
    } catch (e: any) {
      methods.setError('root', {
        message: e.message,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        px={5}
        width={'47%'}
      >
        <Container component="main" maxWidth="md">
          <Card
            elevation={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '32px',
            }}
          >
            <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
              <img src={logo} width="48px" height="48px" />
            </Stack>
            <StyledBox variant="primary" p={3} width={'100%'}>
              <Typography variant="h4" fontWeight={900} mb={1}>
                Sign-In
              </Typography>
              <Typography variant="subtitle2" color={'GrayText'} mb={3}>
                Access admin using your email and passcode
              </Typography>
              {methods.formState.errors.root ? (
                <Typography variant="subtitle2" color={'red'} mb={3}>
                  {methods.formState.errors.root.message}
                </Typography>
              ) : null}
              <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                <Stack direction={'column'} spacing={2}>
                  <StyledBox variant="primary">
                    <Typography
                      variant="subtitle1"
                      fontWeight={'medium'}
                      mb={1}
                    >
                      Username or Email
                    </Typography>
                    <FormTextInput
                      name="username"
                      aria-describedby="password-helper-text"
                      placeholder="Enter Username or Email"
                    />
                  </StyledBox>
                  <StyledBox variant="primary">
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      mb={1}
                    >
                      <Typography variant="subtitle1" fontWeight={'medium'}>
                        Password
                      </Typography>
                      <Link
                        href={props.forgotPasswordUrl}
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={'medium'}>
                          Forgot Password?
                        </Typography>
                      </Link>
                    </Stack>
                    <FormTextInput
                      name="password"
                      aria-describedby="password-helper-text"
                      type="password"
                      placeholder="Enter your passcode"
                    />
                  </StyledBox>
                  {/* <FormCheckboxInput
                    name="remember"
                    keyValue={'value'}
                    keyExtractor={(option) => option.key}
                    options={[{ key: 'Remember me', value: true }]}
                    renderOption={(option) => option.key}
                  /> */}
                  {/* <FormControlLabel control={<FormCheckboxInput value="remember" color="primary" />} label="Remember me" /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    disabled={methods.formState.isSubmitting}
                  >
                    <Typography variant="subtitle1" fontWeight={900}>
                      Sign In
                    </Typography>
                  </Button>
                </Stack>
              </form>
              <Stack
                direction={'column'}
                spacing={1}
                width={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                py={3}
              >
                <Typography variant="subtitle1">
                  New on our platform?{' '}
                  <Link href={signUpUrl}>Creat an account</Link>
                </Typography>
                {/* <Typography variant="subtitle2" color={'GrayText'}>
                  -OR-
                </Typography>
                <Typography variant="subtitle1">
                  <Link>Google</Link>
                </Typography> */}
              </Stack>
            </StyledBox>
          </Card>
        </Container>
      </Stack>
    </FormProvider>
  );
}
