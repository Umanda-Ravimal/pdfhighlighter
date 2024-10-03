import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormTextInput, Stack, StyledBox, Typography } from "@my-workspace/packages-atoms";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";

type Data = {
  projectName: string;
};

const validationSchema = yup
  .object()
  .shape({
    projectName: yup.string().required(),
  })
  .required();

export const CreateProject = ({ onCreateProject }: { onCreateProject: (data: Data) => void }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: Data) => {
    onCreateProject(data);
  };

  const { t } = useTranslation();

  return (
    <Stack direction={"column"} gap={2} width={"100%"}>
      <Typography variant="h6" component="div" align="left" gutterBottom>
        {t("create_new_project")}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={3} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <FormTextInput name="projectName" label="Project Name" />
            <Button variant="contained" type="submit" fullWidth>
              {t("create_project")}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};
