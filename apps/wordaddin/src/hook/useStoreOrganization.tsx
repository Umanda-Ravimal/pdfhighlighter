import { getCurrentOrganizations, getPendingOrganizations } from "@my-workspace/packages-api";
import { useOrganizationStore } from "@my-workspace/packages-zustand";

const useStoreOrganization = () => {
  const {
    setOrganizations,
    setPendingOrganizations,
    setActiveOrganization,
    moveToOrganization,
    removePendingOrganization,
  } = useOrganizationStore();

  const storeOrganizations = async () => {
    const currentOrganizations = await getCurrentOrganizations();
    const pendingOrganizations = await getPendingOrganizations();
    setOrganizations([...currentOrganizations]);
    setPendingOrganizations([...pendingOrganizations]);
  };

  const setActiveOrg = (org: string) => {
    setActiveOrganization(org);
  };

  return {
    storeOrganizations,
    setActiveOrg,
    moveToOrganization,
    removePendingOrganization,
  };
};

export { useStoreOrganization };
