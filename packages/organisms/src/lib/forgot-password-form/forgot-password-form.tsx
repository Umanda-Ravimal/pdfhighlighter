import {
  Button,
  Card,
  StyledBox,
  FormTextInput,
  Typography,
  Container,
  Stack,
  Image,
} from '@my-workspace/packages-atoms';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = { username: string };

type ForgotPasswordFormProps = {
  onSubmit: (data: FormData) => void;
  logo: string;
};

const forgotPasswordSchema = yup.object().shape({
  username: yup.string().required(),
});

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { onSubmit, logo } = props;
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
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
        width={'50%'}
      >
        <Container component="main" maxWidth="md">
          <Card
            elevation={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={logo} alt="logo" />
            <StyledBox variant="primary" p={3} width={'100%'}>
              <Typography variant="h4" fontWeight={900} mb={1}>
                Reset Password
              </Typography>
              <Typography variant="subtitle2" color={'GrayText'} mb={3}>
                Get OTP to reset your password
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
                      placeholder="Enter your Username or Email"
                      type="text"
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
                      Get OTP
                    </Typography>
                  </Button>
                </Stack>
              </form>
            </StyledBox>
          </Card>
        </Container>
      </Stack>
    </FormProvider>
  );
}
