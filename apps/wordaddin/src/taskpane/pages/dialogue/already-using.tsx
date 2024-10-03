import { Button, Stack, Typography, Paper } from "@kelsen-labs/atoms";
import { useTranslation } from "react-i18next";

export const AlreadyUsing = () => {
  const { t } = useTranslation();

  return (
    <Paper variant="container" sx={{ justifyContent: "center" }}>
      <Stack>
        <Typography variant="h4">{t("already_in")}</Typography>
        <Typography variant="body1">{t("already_working")}</Typography>
        <Stack direction={"row"} height={"auto"} justifyContent={"flex-end"} gap={2}>
          <Button variant="button1" onClick={() => Office.context.ui.messageParent("confirm")}>
            {t("confirm")}
          </Button>
          <Button variant="button1" onClick={() => Office.context.ui.messageParent("cancel")}>
            {t("cancel_simple")}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
