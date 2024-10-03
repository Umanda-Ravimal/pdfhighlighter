import { redirectToPage } from "../../utils";
import { signUp } from "@kelsen-labs/api";
import logo from "../../../assets/logo.png";
import {
  Button,
  Card,
  StyledBox,
  FormTextInput,
  Typography,
  Container,
  Stack,
  Link,
  Image,
} from "@kelsen-labs/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import data from "../../utils/signUp.json";
import { useCallback, useMemo } from "react";
import { useEnvironment, useSignUpSchema } from "../../hook";

const signUpFields = data;

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const { signUpSchema } = useSignUpSchema();
  const { baseUrl } = useEnvironment();

  const handleSubmit = useCallback(async (data: FormData) => {
    const result = await signUp(data);
    const username = result.user.getUsername();
    redirectToPage("verify-account", { username });
  }, []);

  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmitWrapper = useCallback(
    async (data: FormData) => {
      methods.clearErrors();
      try {
        await handleSubmit(data);
      } catch (e) {
        if (e instanceof Error) {
          methods.setError("root", { message: e.message });
        }
      }
    },
    [handleSubmit, methods.clearErrors, methods.setError]
  );

  // Memoize the form fields mapping
  const renderedFields = useMemo(
    () =>
      signUpFields.map((field) => (
        <StyledBox key={field.id} variant="primary">
          <Typography variant="subtitle2">{t(field.translationKey)}</Typography>
          <FormTextInput
            name={field.id}
            placeholder={t(field.placeholder)}
            type={field.type}
          />
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
              <Image src={logo} alt="logo" />
              <StyledBox variant="primary" width={"100%"}>
                <Typography variant="h2">{t("sign_up")}</Typography>
                <Typography variant="body2">{t("create_an_account")}</Typography>
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
                      <Typography variant="button">{t("sign_up_button")}</Typography>
                    </Button>
                  </Stack>
                </form>
                <Stack direction={"column"} spacing={1} justifyContent={"center"} alignItems={"center"}>
                  <Typography variant="subtitle2">
                    {t("already_have_an_account")}{" "}
                    <Link href={baseUrl}>{t("sign_in_button")}</Link>
                  </Typography>
                </Stack>
              </StyledBox>
            </Card>
          </Container>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export { SignUpPage };
