import { Button, Card, StyledBox, FormTextInput, Typography, Container, Stack, Link, Image } from "@kelsen-labs/atoms";
import { confirmSignUp, resendAccountActivationCode } from "@kelsen-labs/api";
import { redirectToPage } from "../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import data from "../../utils/verifyAccount.json";

const verifyPasswordFields = data;

type FormData = { otp: string };

const VerifyAccountPage = () => {
  const { t } = useTranslation();
  const params = new URL(window.location.href).searchParams;
  const username = params.get("username");

  const verifyAccountSchema = yup.object().shape({
    otp: yup.string().required(t("form.otp.required")),
  });

  const handleSubmit = useCallback(
    async (data: FormData) => {
      await confirmSignUp(username, data.otp);
      redirectToPage("sign-in");
    },
    [username]
  );

  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    if (countdown === 0) {
    }
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendClick = useCallback(async () => {
    await resendAccountActivationCode(username);
    setCountdown(60);
  }, [username]);


  const methods = useForm({
    resolver: yupResolver(verifyAccountSchema),
  });

  const onSubmitWrapper = async (data: FormData) => {
    methods.clearErrors();
    try {
      await handleSubmit(data);
    } catch (e) {
      if (e instanceof Error) {
        methods.setError("root", { message: e.message });
      }
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <FormProvider {...methods}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"50%"}>
          <Container component="main" maxWidth="md">
            <Card elevation={1}>
              <Stack direction={"row"} width={"100%"} justifyContent={"center"}>
                <Image src={logo} alt="logo" />
              </Stack>
              <StyledBox variant="primary" width={"100%"}>
                <Typography variant="h4">{t("activate_account")}</Typography>
                <Typography variant="body2">{t("enter_the_otp")}</Typography>
                {methods.formState.errors.root ? (
                  <Typography variant="caption">{methods.formState.errors.root.message}</Typography>
                ) : null}
                <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                  <Stack direction={"column"}>
                    {verifyPasswordFields.map((field) => (
                      <StyledBox key={field.id} variant="primary">
                        <Typography variant="body2">{t(field.translationKey)}</Typography>
                        <FormTextInput name={field.id} placeholder={t(field.placeholder)} type={field.type} />
                      </StyledBox>
                    ))}
                    <Button
                      type="submit"
                      fullWidth
                      variant="button2"
                      sx={{ textTransform: "none" }}
                      disabled={methods.formState.isSubmitting}
                    >
                      <Typography variant="button">{t("activate")}</Typography>
                    </Button>
                    <Typography variant="subtitle2">
                      {t("having_trouble")}{" "}
                      {countdown <= 0 ? (
                        <Link
                          onClick={handleResendClick}
                          sx={{
                            cursor: countdown > 0 ? "not-allowed" : "pointer",
                            pointerEvents: countdown > 0 ? "none" : "auto",
                          }}
                        >
                          {t("resend_code")}
                        </Link>
                      ) : (
                        <Link
                          sx={{
                            cursor: countdown > 0 ? "not-allowed" : "pointer",
                            pointerEvents: countdown > 0 ? "none" : "auto",
                          }}
                        >
                          {countdown > 0 ? `${t("resend_code_in")} ${countdown}s` : t("resend_code")}
                        </Link>
                      )}
                    </Typography>
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

export { VerifyAccountPage };
