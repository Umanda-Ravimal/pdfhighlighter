import { create } from '@my-workspace/packages-zustand';

interface Organization {
  id: string;
  name: string;
}

interface State {
  organizations: Organization[];
  pendingOrganizations: Organization[];
  activeOrganization: string;
}

interface Actions {
  setOrganizations: (orgs: Organization[]) => void;
  setPendingOrganizations: (orgs: Organization[]) => void;
  setActiveOrganization: (orgId: string) => void;
  moveToOrganization: (org: Organization) => void;
  removePendingOrganization: (orgId: string) => void;
}

const useOrganizationStore = create<State & Actions>((set) => ({
  organizations: [],
  pendingOrganizations: [],
  activeOrganization: '',
  setOrganizations: (orgs) => set({ organizations: orgs }),
  setPendingOrganizations: (orgs) => set({ pendingOrganizations: orgs }),
  setActiveOrganization: (orgId) => set({ activeOrganization: orgId }),
  moveToOrganization: (org) => {
    set((state) => ({
      organizations: [...state.organizations, org],
      pendingOrganizations: state.pendingOrganizations.filter(
        (pendingOrg) => pendingOrg.id !== org.id
      ),
    }));
  },
  removePendingOrganization: (orgId) => {
    set((state) => ({
      pendingOrganizations: state.pendingOrganizations.filter(
        (pendingOrg) => pendingOrg.id !== orgId
      ),
    }));
  },
}));

export { useOrganizationStore };
