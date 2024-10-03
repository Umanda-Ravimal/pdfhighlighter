import React, { useMemo } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const useSignUpSchema = () => {
  const { t } = useTranslation();

  const signUpSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(t("form.username.required")),
      email: yup.string().email(t("form.email.invalid")).required(t("form.email.required")),
      password: yup.string().min(8, t("form.password.min")).required(t("form.password.required")),
      confirmPassword: yup
        .string()
        .required(t("form.confirmPassword.required"))
        .oneOf([yup.ref("password"), null], t("form.confirmPassword.mismatch")),
    });
  }, [t]);

  return {
    signUpSchema,
  };
};

export { useSignUpSchema };
