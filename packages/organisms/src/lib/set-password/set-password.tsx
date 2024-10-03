import {
  Button,
  Card,
  StyledBox,
  FormTextInput,
  Typography,
  Container,
  Stack,
} from '@my-workspace/packages-atoms';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = { code: string; password: string };

type SetPasswordFormProps = {
  onSubmit: (data: FormData) => void;
  logo: string;
};

const setPasswordFormSchema = yup.object().shape({
  code: yup.string().required(),
  password: yup.string().required().min(8),
});

export default function SetPasswordForm(props: SetPasswordFormProps) {
  const { onSubmit, logo } = props;
  const methods = useForm({
    resolver: yupResolver(setPasswordFormSchema),
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
        px={5}
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
              padding: '32px',
            }}
          >
            <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
              <img src={logo} width="48px" height="48px" />
            </Stack>
            <StyledBox variant="primary" p={3} width={'100%'}>
              <Typography variant="h4" fontWeight={900} mb={1}>
                Set New Password
              </Typography>
              <Typography variant="subtitle2" color={'GrayText'} mb={3}>
                Setup your password using the OTP
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
                      OTP
                    </Typography>
                    <FormTextInput
                      name="code"
                      aria-describedby="password-helper-text"
                      placeholder="Enter your otp"
                      type="text"
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
                      placeholder="Enter new password"
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
                      Set Password
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
