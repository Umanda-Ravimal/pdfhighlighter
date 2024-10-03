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

type FormData = { otp: string };

type VerifyAccountFormProps = {
  onSubmit: (data: FormData) => void;
  onResendClick: () => void;
  logo: string;
};

const verifyAccountSchema = yup.object().shape({
  otp: yup.string().required(),
});

export default function VerifyAccountForm(props: VerifyAccountFormProps) {
  const { onSubmit, onResendClick, logo } = props;
  const methods = useForm({
    resolver: yupResolver(verifyAccountSchema),
  });
  const handleResendClick = (e: any) => {
    e.preventDefaultBehavior();
    onResendClick();
  };
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
                Activate Account
              </Typography>
              <Typography variant="subtitle2" color={'GrayText'} mb={3}>
                Enter the OTP sent to you email to verify your email
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
                      name="otp"
                      aria-describedby="password-helper-text"
                      placeholder="Enter your otp"
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
                      Activate
                    </Typography>
                  </Button>
                  <Typography variant="subtitle1">
                    Having trouble?{' '}
                    <Link
                      onClick={handleResendClick}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      resend code
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </StyledBox>
          </Card>
        </Container>
      </Stack>
    </FormProvider>
  );
}
