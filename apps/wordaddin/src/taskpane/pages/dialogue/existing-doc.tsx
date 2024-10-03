import { Button, Stack, Typography, Paper } from "@my-workspace/packages-atoms";
import { useTranslation } from "react-i18next";

export const ExistingDocPrompt = () => {
  const { t } = useTranslation();

  const handleOpenClick = () => {
    Office.context.ui.messageParent("open");
  };
  return (
    <Paper variant="container" sx={{ justifyContent: "center" }}>
      <Stack>
        <Typography variant="h4">{t("already_in_project")}</Typography>
        <Typography variant="body1">{t("want_to_create_new")}</Typography>
        <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
          <Button variant="button1" onClick={handleOpenClick}>
            {t("create_project")}
          
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
