import { ThemeProvider } from "@mui/material";
import { type Page } from "../utils";
import { theme } from "../theme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { MemoryRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  ProjectHome,
  ProjectMainPage,
  Home,
  SignInPage,
  SignUpPage,
  VerifyAccountPage,
  ForgotPasswordPage,
  SetPasswordPage,
  OrganizationHome,
  SyncPage,
  UnsyncPage,
  NewProject,
  ExistProject
} from "./pages";
import { ProtectedPage } from "./components";
import { FileUploadModal } from "./components/project/file-upload-modal";
import { ViewSource } from "./pages/view-source";
import { AddVersion, 
  // ImportPage, 
  SavePage, VersionHistory } from "@kelsen-labs/organisms";
import { AppRoutes } from "@kelsen-labs/common";
import { DeleteProjectPrompt } from "./pages/dialogue/delete-project";
import { ExistingDocPrompt } from "./pages/dialogue/existing-doc";

const App: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") as Page;
  

  // useEffect(() => {
  //   i18n.changeLanguage(navigator.language);
  // }, []);

  return (
    <>
      {/* <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{renderPage(page)}</ThemeProvider>
      </I18nextProvider> */}
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          {/* {renderPage(page)} */}
          <MemoryRouter initialEntries={[`/${page || "home"}`]}>
            <Routes>
              <Route path={AppRoutes.HOME} element={<Home />} />
              <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
              <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
              <Route path={AppRoutes.VERIFY_ACCOUNT} element={<VerifyAccountPage />} />
              <Route path={AppRoutes.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
              <Route path={AppRoutes.SET_PASSWORD} element={<SetPasswordPage />} />
              <Route path={AppRoutes.FILE_UPLOAD} element={<FileUploadModal />} />
              <Route path={AppRoutes.PROJECT_HOME} element={<ProjectHome />} />
              <Route path={AppRoutes.PROJECT_MAIN} element={<ProjectMainPage />} />
              <Route
                path={AppRoutes.ORGANIZATION_MAIN}
                element={
                  <ProtectedPage>
                    <OrganizationHome />
                  </ProtectedPage>
                }
              />
              <Route path={AppRoutes.VIEW_SOURCE} element={<ViewSource />} />
              {/* <Route path={AppRoutes.IMPORT_PAGE} element={<ImportPage />} /> */}
              <Route path={AppRoutes.SAVE_PAGE} element={<SavePage />} />
              <Route path={AppRoutes.SYNC_PAGE} element={<SyncPage />} />
              <Route path={AppRoutes.UNSYNC_PAGE} element={<UnsyncPage />} />
              <Route path={AppRoutes.DELETE_DIALOG} element={<DeleteProjectPrompt />} />
              <Route path={AppRoutes.EXIST_DIALOG} element={<ExistingDocPrompt/>} />
              <Route path={AppRoutes.PROJECT_CREATE} element={<NewProject/>} />
              <Route path={AppRoutes.PROJECT_EXIST} element={<ExistProject/>} />
              <Route path={AppRoutes.VERSION_HISTORY} element={<VersionHistory/>} />
              <Route path={AppRoutes.ADD_VERSION} element={<AddVersion/>} />
              <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
