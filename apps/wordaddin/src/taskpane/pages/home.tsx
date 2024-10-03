import { Button, Link, Typography, Image, Stack } from "@kelsen-labs/atoms";
import logo from "../../../assets/logo.png";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import { OrganizationHome } from "./organization-home";
import { ProjectHome } from "./project/project-home";
import { useSessionStore } from "@kelsen-labs/zustand";
import { useDialog } from "@kelsen-labs/common";
import { ProjectMainPage } from "./project/project-main";

const Home = () => {
  const session = useSessionStore(({ session }) => session);
  const { t } = useTranslation();
  const { handleSignUpClick, handleLoginClick } = useDialog();
  
  return session ? (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <>
        <Image src={logo} alt="logo" />
        <Typography variant="centerText">{t("to_access")}</Typography>
        <Button variant="button1" onClick={(e) => handleLoginClick("sign-in", e)}>
          {t("login_to")}
        </Button>
        <Typography variant="centerText">
          {t("dont_have_an_account")}{" "}
          <Link
            sx={{
              cursor: "pointer",
            }}
            onClick={(e) => handleSignUpClick("sign-up", e)}
          >
            {t("sign_up_button")}
          </Link>
        </Typography>
      </>
    </Stack>
  ) : (
    <FluentProvider theme={webLightTheme}>
      {/* <LoggedInHome title={"Bran"} /> */}
      <ProjectMainPage />
      {/* <ProjectHome/> */}
      {/* <OrganizationHome/> */}
    </FluentProvider>
  );
};

export { Home };
