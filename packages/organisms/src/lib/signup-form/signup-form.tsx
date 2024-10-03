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

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormProps = {
  onSubmit: (data: FormData) => void;
  signInUrl: string;
  logo: string;
};

const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required('Confirm Password field is required')
    .test(
      'equal',
      'Password and Confirm Password fields must be equal',
      function (value) {
        return this.parent.password === value;
      }
    ),
});

export default function SignUp(props: SignUpFormProps) {
  const { onSubmit, signInUrl, logo } = props;
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmitWrapper = async (data: FormData) => {
    methods.clearErrors();
    try {
      await onSubmit(data);
    } catch (e: any) {
      methods.setError('root', { message: e.message });
    }
  };
  return (
    <FormProvider {...methods}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'47%'}
        mt={4}
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
                Sign-Up
              </Typography>
              <Typography variant="subtitle2" color={'GrayText'} mb={3}>
                Create an account
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
                      Name
                    </Typography>
                    <FormTextInput
                      name="username"
                      aria-describedby="password-helper-text"
                      placeholder="Enter your username"
                    />
                  </StyledBox>
                  <StyledBox variant="primary">
                    <Typography
                      variant="subtitle1"
                      fontWeight={'medium'}
                      mb={1}
                    >
                      Email
                    </Typography>
                    <FormTextInput
                      name="email"
                      aria-describedby="password-helper-text"
                      placeholder="Enter your email address"
                    />
                  </StyledBox>
                  <StyledBox variant="primary">
                    <Typography
                      variant="subtitle1"
                      fontWeight={'medium'}
                      mb={1}
                    >
                      Password
                    </Typography>
                    <FormTextInput
                      name="password"
                      aria-describedby="password-helper-text"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </StyledBox>
                  <StyledBox variant="primary" mb={1}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={'medium'}
                      mb={1}
                    >
                      Confirm Password
                    </Typography>
                    <FormTextInput
                      name="confirmPassword"
                      aria-describedby="password-helper-text"
                      placeholder="Re-enter your password"
                      type="password"
                    />
                  </StyledBox>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    disabled={methods.formState.isSubmitting}
                  >
                    <Typography variant="subtitle1" fontWeight={900}>
                      Sign Up
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
                  Already have an account? <Link href={signInUrl}>Sign In</Link>
                </Typography>
              </Stack>
            </StyledBox>
          </Card>
        </Container>
      </Stack>
    </FormProvider>
  );
}
