import { Button, Card, StyledBox, FormTextInput, Typography, Container, Stack, Image } from "@my-workspace/packages-atoms";
import { confirmPassword } from "@my-workspace/api";
import { redirectToPage } from "../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import data from "../../utils/setPassword.json";
const setPasswordFields = data;

type FormData = {
  code: string;
  password: string;
};

const SetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const params = new URL(window.location.href).searchParams;
  const username = params.get("username");

  const setPasswordFormSchema = yup.object().shape({
    code: yup.string().required(t("form.otp.required")),
    password: yup.string().min(8, t("form.password.min")).required(t("form.password.required")),
  });

  // const handleSubmit = useCallback(async (data: FormData) => {
  //   await confirmPassword({
  //     newPassword: data.password,
  //     verificationCode: data.code,
  //     username,
  //   });
  //   redirectToPage("sign-in");
  // }, [username]);

  if (!username) redirectToPage("forgot-password");

  const methods = useForm({
    resolver: yupResolver(setPasswordFormSchema),
  });

  const onSubmitWrapper = useCallback(
    async (data: FormData) => {
      methods.clearErrors();
      try {
        // await handleSubmit(data);
      } catch (e) {
        if (e instanceof Error) {
          methods.setError("root", { message: e.message });
        }
      }
    },
    [methods.clearErrors, methods.setError]
  );

  const renderedFields = useMemo(
    () =>
      setPasswordFields.map((field) => (
        <StyledBox key={field.id} variant="primary">
          <Typography variant="body2">{t(field.translationKey)}</Typography>
          <FormTextInput name={field.id} placeholder={t(field.placeholder)} type={field.type} />
        </StyledBox>
      )),
    [t]
  );

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <FormProvider {...methods}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"50%"}>
          <Container component="main" maxWidth="md">
            <Card elevation={1}>
              <Stack direction={"row"} justifyContent={"center"}>
                <Image src={logo} alt="logo" />
              </Stack>
              <StyledBox variant="primary" width={"100%"}>
                <Typography variant="h4">{t("set_new_password")}</Typography>
                <Typography variant="body2">{t("setup_password")}</Typography>
                {methods.formState.errors.root ? (
                  <Typography variant="caption">{methods.formState.errors.root.message}</Typography>
                ) : null}
                <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                  <Stack direction={"column"} spacing={2}>
                    {renderedFields}
                    <Button
                      type="submit"
                      fullWidth
                      variant="button2"
                      sx={{ textTransform: "none" }}
                      disabled={methods.formState.isSubmitting}
                    >
                      <Typography variant="button">{t("set_password")}</Typography>
                    </Button>
                  </Stack>
                </form>
              </StyledBox>
            </Card>
          </Container>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export { SetPasswordPage };
