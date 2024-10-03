import React, { useCallback, useMemo } from "react";
import {
  Button,
  Card,
  // StyledBox,
  // FormTextInput,
  Typography,
  Container,
  Stack,
  Image,
} from "@kelsen-labs/atoms";
import { initResetPassword } from "@kelsen-labs/api";
import { redirectToPage } from "../../utils";
import logo from "../../../assets/logo.png";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import data from "../../utils/forgotPassword.json";

const forgotPasswordFields = data;

type FormData = {
  username: string;
};

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  const forgotPasswordSchema = yup.object().shape({
    username: yup.string().required(t("form.username.required")),
  });

  const handleSubmit = useCallback(async (data: FormData) => {
    await initResetPassword(data.username);
    redirectToPage("set-password", {
      username: data.username,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
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

  // const renderedFields = useMemo(
  //   () =>
  //     forgotPasswordFields.map((field) => (
  //       <StyledBox key={field.id} variant="primary">
  //         <Typography variant="body2">{t(field.translationKey)}</Typography>
  //         <FormTextInput
  //           name={field.id}
  //           placeholder={t(field.placeholder)}
  //           type={field.type}
  //         />
  //       </StyledBox>
  //     )),
  //   [t]
  // );

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <FormProvider {...methods}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"50%"}
        >
          <Container component="main" maxWidth="md">
            <Card elevation={1}>
              <Image src={logo} alt="logo" />
              {/* <StyledBox variant="primary" width={"100%"}>
                <Typography variant="h4">{t("reset_password")}</Typography>
                <Typography variant="body2">{t("get_otp_reset")}</Typography>
                {methods.formState.errors.root ? (
                  <Typography variant="caption">
                    {methods.formState.errors.root.message}
                  </Typography>
                ) : null}
                <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                  <Stack direction={"column"}>
                    {renderedFields}
                    <Button
                      type="submit"
                      fullWidth
                      variant="button2"
                      sx={{ textTransform: "none" }}
                      disabled={methods.formState.isSubmitting}
                    >
                      <Typography variant="button">{t("get_otp")}</Typography>
                    </Button>
                  </Stack>
                </form>
              </StyledBox> */}
            </Card>
          </Container>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export { ForgotPasswordPage };
