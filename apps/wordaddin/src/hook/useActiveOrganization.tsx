import { useOrganizationStore } from "@my-workspace/packages-zustand";

const useActiveOrganization = () => {
  // const { setOrganizations, setActiveOrganization } = useOrganizationStore();

  const storeData = useOrganizationStore((state) => ({
    organizations: state.organizations,
    activeOrganization: state.activeOrganization,
    pendingOrganizations: state.pendingOrganizations,
  }));

  const currentOrganizations = storeData.organizations;
  const activeOrganization = storeData.activeOrganization;
  const pendingOrganizations = storeData.pendingOrganizations;

  return {
    currentOrganizations,
    activeOrganization,
    pendingOrganizations,
  };
};

export { useActiveOrganization };
