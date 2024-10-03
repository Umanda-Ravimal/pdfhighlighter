import { Stack, Typography, Card, Button, Box, Container } from "@my-workspace/packages-atoms";
import React, { useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useActiveOrganization, useStoreOrganization } from "../../hook";
import { AppRoutes } from "@my-workspace/packages-common";

interface Organization {
  id: string;
  name: string;
}

const OrganizationHome = () => {
  const { t } = useTranslation();
  const { storeOrganizations, setActiveOrg, moveToOrganization, removePendingOrganization } = useStoreOrganization();

  useEffect(() => {
    storeOrganizations();
  }, [storeOrganizations]);

  const navigate = useNavigate();
  const { currentOrganizations, pendingOrganizations } = useActiveOrganization();

  const pickOrg = useCallback(
    async (org: Organization) => {
      await setActiveOrg(org.id);
      navigate(AppRoutes.PROJECT_MAIN);
    },
    [setActiveOrg, navigate]
  );

  const acceptOrganization = useCallback(
    (org: Organization) => {
      moveToOrganization(org);
    },
    [moveToOrganization]
  );

  const rejectOrganization = useCallback(
    (org: Organization) => {
      removePendingOrganization(org.id);
    },
    [removePendingOrganization]
  );

  const renderedCurrentOrganizations = useMemo(
    () =>
      currentOrganizations.map((org) => (
        <Card elevation={2} key={org.id} onClick={() => pickOrg(org)}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">{org.name}</Typography>
          </Box>
        </Card>
      )),
    [currentOrganizations, pickOrg]
  );

  const renderedPendingOrganizations = useMemo(
    () =>
      pendingOrganizations.map((org) => (
        <Card elevation={2} key={org.id}>
          <Box display="flex" flexDirection={"column"} alignItems="center">
            <Typography variant="body2">{org.name}</Typography>
            <Box display="flex" justifyContent="space-between">
              <Button variant="accept" onClick={() => acceptOrganization(org)}>
                <CheckIcon />
              </Button>
              <Button variant="reject" onClick={() => rejectOrganization(org)}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
        </Card>
      )),
    [pendingOrganizations, acceptOrganization, rejectOrganization]
  );

  return (
    <Stack height="100vh" direction="column" alignItems="center">
      <Container component="main">
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h3">{t("current_organizations")}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {renderedCurrentOrganizations}
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h3">{t("pending_organizations")}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {renderedPendingOrganizations}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export { OrganizationHome };
