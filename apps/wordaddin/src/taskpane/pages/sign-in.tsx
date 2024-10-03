import {
  Button,
  Card,
  StyledBox,
  FormTextInput,
  Typography,
  Container,
  Stack,
  Link,
  FormCheckboxInput,
  Image,
} from "@my-workspace/packages-atoms";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import React, { useCallback, useMemo } from "react";
import { useEnvironment } from "../../hook/useEnvironment";
import { signIn } from "@my-workspace/packages-api";
import { redirectToPage } from "../../utils";
import logo from "../../../assets/logo.png";
import data from "../../utils/signIn.json";
const signInFields = data;

type FormData = {
  username: string;
  password: string;
};

const signInSchema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const SignInPage = () => {
  const { signUpUrl, forgotPasswordUrl } = useEnvironment();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const res = await signIn(data);
        Office.context.ui.messageParent(JSON.stringify(res));
      } catch (e:any) {
        if (e.message === "User is not confirmed.") {
          redirectToPage("verify-account", {
            username: data.username,
          });
        }
        throw e;
      }
    },
    []
  );

  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(signInSchema),
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


  const renderedFields = useMemo(
    () =>
      signInFields.map((field) => (
        <StyledBox key={field.id} variant="primary">
          <Typography variant="body2">{t(field.translationKey)}</Typography>
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
                <Typography variant="h2">{t("sign_in")}</Typography>
                <Typography variant="body2">{t("access_admin")}</Typography>
                {methods.formState.errors.root ? (
                  <Typography variant="caption">{methods.formState.errors.root.message}</Typography>
                ) : null}
                <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                  <Stack direction={"column"}>
                    {renderedFields}
                    <Link
                      href={forgotPasswordUrl}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="subtitle2">{t("forgot_password")}</Typography>
                    </Link>
                    <FormCheckboxInput
                      name="remember"
                      keyValue={"value"}
                      keyExtractor={(option) => option.key}
                      options={[{ key: t("remember_me"), value: true }]}
                      renderOption={(option) => option.key}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="button2"
                      sx={{ textTransform: "none" }}
                      disabled={methods.formState.isSubmitting}
                    >
                      <Typography variant="button">{t("sign_in_button")}</Typography>
                    </Button>
                  </Stack>
                </form>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Typography variant="body2">
                    {t("new_on_our_platform")} <Link href={signUpUrl}>{t("create_an_account")}</Link>
                  </Typography>
                  <Typography variant="body1">-- {t("or")} --</Typography>
                  <Typography variant="body1">
                    <Link>{t("google")}</Link>
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

export { SignInPage };
